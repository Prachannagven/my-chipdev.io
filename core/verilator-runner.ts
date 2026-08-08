import { existsSync } from 'node:fs';
import { access, mkdir, mkdtemp, readFile, writeFile } from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import { spawn } from 'node:child_process';
import { getQuestionConfig } from './question-manifest';

export type RunRequest = {
  questionFileName: string;
  source: string;
};

export type RunResult = {
  ok: boolean;
  checked: boolean;
  status: 'compile_error' | 'runtime_error' | 'passed' | 'failed';
  verdict: 'passed' | 'failed';
  questionFileName: string;
  testbenchFile: string;
  vcdPath: string;
  command: string;
  stdout: string;
  stderr: string;
  diagnostics: string[];
  mismatches?: ComparisonMismatch[];
  waveform?: WaveformData;
};

export type GradeRequest = {
  questionId: string;
  source: string;
  mode: 'run' | 'submit';
};

export type PublicCaseResult = {
  id: string;
  status: 'passed' | 'failed';
  expected?: string;
  actual?: string;
  message?: string;
};

export type GradeResult = {
  status: 'accepted' | 'wrong_answer' | 'compile_error' | 'runtime_error' | 'timeout' | 'internal_error';
  public: { passed: number; total: number; cases: PublicCaseResult[] };
  hidden?: { passed: number; total: number };
  diagnostics: string[];
  stdout: string;
  stderr: string;
  vcdPath?: string;
  waveform?: WaveformData;
};

type ComparisonMismatch = {
  signal: string;
  time: number;
  expected: string;
  actual: string;
};

type SimulationResult = {
  ok: boolean;
  status: 'compile_error' | 'runtime_error' | 'timeout' | 'completed';
  sourceFile: string;
  testbenchCopy: string;
  vcdPath: string;
  command: string;
  stdout: string;
  stderr: string;
  diagnostics: string[];
  waveform?: WaveformData;
  vcd?: ParsedVcd;
};

type ParsedVcd = {
  signalByName: Map<string, { width: number; samples: Array<{ time: number; value: string }> }>;
};

export type WaveformData = {
  times: number[];
  signals: Array<{
    name: string;
    width: number;
    values: string[];
  }>;
};

const referenceCache = new Map<string, Promise<SimulationResult>>();

function runProcess(command: string, args: string[], cwd: string, timeoutMs = 120_000): Promise<{ code: number; stdout: string; stderr: string; timedOut: boolean }> {
  return new Promise((resolve, reject) => {
    const child = spawn(command, args, {
      cwd,
      env: buildProcessEnv(),
      shell: false,
      stdio: ['ignore', 'pipe', 'pipe'],
    });

    let stdout = '';
    let stderr = '';
    let timedOut = false;
    const timeout = setTimeout(() => {
      timedOut = true;
      if (process.platform === 'win32' && child.pid) {
        spawn('taskkill.exe', ['/pid', String(child.pid), '/t', '/f'], { windowsHide: true });
      } else {
        child.kill('SIGKILL');
      }
    }, timeoutMs);

    child.stdout.setEncoding('utf8');
    child.stderr.setEncoding('utf8');
    child.stdout.on('data', (chunk) => {
      stdout += chunk;
    });
    child.stderr.on('data', (chunk) => {
      stderr += chunk;
    });

    child.on('error', (error) => {
      clearTimeout(timeout);
      reject(error);
    });
    child.on('close', (code) => {
      clearTimeout(timeout);
      resolve({ code: code ?? 1, stdout, stderr, timedOut });
    });
  });
}

function buildProcessEnv(): NodeJS.ProcessEnv {
  if (process.platform !== 'win32') {
    return process.env;
  }

  const msysPaths = ['C:\\msys64\\mingw64\\bin', 'C:\\msys64\\usr\\bin'].filter((entry) => existsSync(entry));
  const currentPath = process.env.Path ?? process.env.PATH ?? '';

  return {
    ...process.env,
    Path: [...msysPaths, currentPath].filter(Boolean).join(path.delimiter),
    PATH: [...msysPaths, currentPath].filter(Boolean).join(path.delimiter),
  };
}

function toMsysPath(value: string): string {
  const normalized = path.resolve(value);
  const match = normalized.match(/^([A-Za-z]):[\\/](.*)$/);
  if (!match) {
    return value.replace(/\\/g, '/');
  }

  return `/${match[1].toLowerCase()}/${match[2].replace(/\\/g, '/')}`;
}

function shellEscape(value: string): string {
  return `'${value.replace(/'/g, `'\\''`)}'`;
}

function prepareVerilatorArgs(args: string[]): string[] {
  if (process.platform !== 'win32') {
    return args;
  }

  const pathSwitches = new Set(['-Mdir']);
  return args.map((arg, index) => {
    if (pathSwitches.has(args[index - 1]) || /^[A-Za-z]:[\\/]/.test(arg)) {
      return toMsysPath(arg);
    }

    return arg;
  });
}

function runVerilatorBuild(args: string[], cwd: string): Promise<{ code: number; stdout: string; stderr: string; timedOut: boolean }> {
  const msysBash = 'C:\\msys64\\usr\\bin\\bash.exe';
  if (process.platform === 'win32' && existsSync(msysBash) && !process.env.VERILATOR) {
    const command = `export MSYSTEM=MINGW64; export PATH=/mingw64/bin:/usr/bin:$PATH; unset VERILATOR_ROOT; /mingw64/bin/verilator ${prepareVerilatorArgs(args).map(shellEscape).join(' ')}`;
    return runProcess(msysBash, ['-lc', command], cwd);
  }

  return runProcess(process.env.VERILATOR ?? 'verilator', args, cwd);
}

function resolveWindowsMakeFlags(): string[] {
  if (process.platform !== 'win32') {
    return [];
  }

  const compatibleGxx = process.env.CXX ?? 'C:\\mingw64\\bin\\g++.exe';
  if (!/^[A-Za-z]:[\\/]/.test(compatibleGxx) || !existsSync(compatibleGxx)) {
    return [];
  }

  const msysGxx = toMsysPath(compatibleGxx);
  return ['-MAKEFLAGS', `CXX=${msysGxx}`, '-MAKEFLAGS', `LINK=${msysGxx}`];
}

function resolveQuestionBase(questionFileName: string): string {
  return questionFileName.replace(/\.md$/i, '');
}

function resolveTestbenchPath(questionFileName: string): string {
  return path.join(process.cwd(), 'solutions', `${resolveQuestionBase(questionFileName)}_tb.sv`);
}

function resolveTopModule(testbenchSource: string): string {
  const match = testbenchSource.match(/^\s*module\s+([A-Za-z_][A-Za-z0-9_]*)/m);
  if (!match) {
    throw new Error('Could not determine testbench module name.');
  }

  return match[1];
}

function extractDiagnostics(output: string): string[] {
  const lines = output.split('\n');
  const diagnostics: string[] = [];

  for (let index = 0; index < lines.length; index += 1) {
    const line = lines[index];
    if (!line.startsWith('%Warning-') && !line.startsWith('%Error-')) {
      continue;
    }

    const block: string[] = [line];
    let cursor = index + 1;
    while (cursor < lines.length) {
      const next = lines[cursor];
      if (next.startsWith('%Warning-') || next.startsWith('%Error-') || next.trim() === '') {
        break;
      }
      block.push(next);
      cursor += 1;
    }

    diagnostics.push(block.join('\n'));
    index = cursor - 1;
  }

  return diagnostics;
}

function stripSystemVerilogComments(source: string): string {
  return source
    .replace(/\/\*[\s\S]*?\*\//g, '')
    .replace(/\/\/.*$/gm, '');
}

function parseOutputPorts(source: string): string[] {
  const cleanSource = stripSystemVerilogComments(source);
  const ports = new Set<string>();

  for (const rawLine of cleanSource.split('\n')) {
    if (!/\boutput\b/.test(rawLine)) {
      continue;
    }

    const declaration = rawLine
      .replace(/^.*?\boutput\b/, '')
      .replace(/\[[^\]]+\]/g, ' ')
      .replace(/[);]/g, ' ');

    for (const rawName of declaration.split(',')) {
      const words = rawName.trim().split(/\s+/).filter(Boolean);
      const name = words[words.length - 1]?.match(/^([A-Za-z_][A-Za-z0-9_]*)/)?.[1];
      if (name && name !== 'output' && name !== 'input' && name !== 'inout') {
        ports.add(name);
      }
    }
  }

  return Array.from(ports);
}

function stripBuildNoise(output: string): string {
  return output
    .split('\n')
    .filter((line) => {
      const trimmed = line.trim();
      if (!trimmed) {
        return false;
      }

      if (
        trimmed.startsWith('make: Entering directory') ||
        trimmed.startsWith('make: Leaving directory') ||
        trimmed.startsWith('g++ ') ||
        /^.+[\\/]g\+\+(\.exe)?\s/.test(trimmed) ||
        trimmed.startsWith('python3 /usr/share/verilator/bin/verilator_includer') ||
        /^python3 .+[\\/]verilator_includer/.test(trimmed) ||
        trimmed.startsWith('echo "" >') ||
        trimmed.startsWith('rm V')
      ) {
        return false;
      }

      return true;
    })
    .join('\n');
}

function parseFullVcd(vcdText: string): ParsedVcd {
  const idToSignal = new Map<string, { name: string; width: number }>();
  const rawSamples = new Map<string, Array<{ time: number; value: string }>>();
  const scopes: string[] = [];

  let currentTime = 0;
  let inHeader = true;

  for (const raw of vcdText.split('\n')) {
    const line = raw.trim();
    if (!line) {
      continue;
    }

    if (inHeader) {
      if (line.startsWith('$scope')) {
        const parts = line.split(/\s+/);
        if (parts.length >= 3) {
          scopes.push(parts[2]);
        }
        continue;
      }

      if (line.startsWith('$upscope')) {
        scopes.pop();
        continue;
      }

      if (line.startsWith('$var')) {
        const parts = line.split(/\s+/);
        if (parts.length >= 6) {
          const width = Number(parts[2]) || 1;
          const id = parts[3];
          const name = parts[4];
          const scopedName = [...scopes, name].join('.');
          idToSignal.set(id, { name: scopedName, width });
        }
        continue;
      }

      if (line.startsWith('$enddefinitions')) {
        inHeader = false;
      }
      continue;
    }

    if (line.startsWith('#')) {
      currentTime = Number(line.slice(1)) || currentTime;
      continue;
    }

    if (line.startsWith('b')) {
      const [value, id] = line.slice(1).split(/\s+/);
      if (!idToSignal.has(id)) {
        continue;
      }
      const entries = rawSamples.get(id) ?? [];
      entries.push({ time: currentTime, value });
      rawSamples.set(id, entries);
      continue;
    }

    const scalarValue = line[0];
    const id = line.slice(1);
    if (!idToSignal.has(id)) {
      continue;
    }
    const entries = rawSamples.get(id) ?? [];
    entries.push({ time: currentTime, value: scalarValue });
    rawSamples.set(id, entries);
  }

  const signalByName = new Map<string, { width: number; samples: Array<{ time: number; value: string }> }>();
  for (const [id, signal] of idToSignal.entries()) {
    signalByName.set(signal.name, {
      width: signal.width,
      samples: rawSamples.get(id) ?? [],
    });
  }

  return { signalByName };
}

function parseVcd(vcdText: string, maxSignals = 10, maxTimes = 80): WaveformData {
  const fullVcd = parseFullVcd(vcdText);
  const selectedSignals = Array.from(fullVcd.signalByName.entries())
    .filter(([, signal]) => signal.samples.length > 0)
    .slice(0, maxSignals);

  const allTimes = new Set<number>();
  for (const [, signal] of selectedSignals) {
    for (const entry of signal.samples) {
      allTimes.add(entry.time);
    }
  }

  const times = Array.from(allTimes).sort((a, b) => a - b).slice(0, maxTimes);

  const signals = selectedSignals.map(([name, signal]) => {
    const entries = signal.samples;
    let cursor = 0;
    let lastValue = signal.width > 1 ? 'x'.repeat(signal.width) : 'x';
    const values: string[] = [];

    for (const t of times) {
      while (cursor < entries.length && entries[cursor].time <= t) {
        lastValue = entries[cursor].value;
        cursor += 1;
      }
      values.push(lastValue);
    }

    return {
      name,
      width: signal.width,
      values,
    };
  });

  return { times, signals };
}

async function resolveVcdPath(candidatePath: string): Promise<string> {
  try {
    await access(candidatePath);
    return candidatePath;
  } catch {
    return candidatePath;
  }
}

function valueAt(samples: Array<{ time: number; value: string }>, time: number, width: number): string {
  let current = width > 1 ? 'x'.repeat(width) : 'x';
  for (const sample of samples) {
    if (sample.time > time) {
      break;
    }
    current = sample.value;
  }

  return current;
}

function findDutSignal(vcd: ParsedVcd, port: string): { width: number; samples: Array<{ time: number; value: string }> } | undefined {
  return Array.from(vcd.signalByName.entries()).find(([name]) => name.endsWith(`.DUT.${port}`))?.[1];
}

function compareOutputWaveforms(
  candidate: ParsedVcd,
  reference: ParsedVcd,
  outputPorts: string[],
  startTime = 0,
  endTime = Number.POSITIVE_INFINITY,
): ComparisonMismatch[] {
  const mismatches: ComparisonMismatch[] = [];

  for (const port of outputPorts) {
    const actualSignal = findDutSignal(candidate, port);
    const expectedSignal = findDutSignal(reference, port);

    if (!actualSignal || !expectedSignal) {
      mismatches.push({
        signal: port,
        time: 0,
        expected: expectedSignal ? '<present>' : '<missing>',
        actual: actualSignal ? '<present>' : '<missing>',
      });
      continue;
    }

    const times = Array.from(new Set([
      startTime,
      ...actualSignal.samples.map((sample) => sample.time),
      ...expectedSignal.samples.map((sample) => sample.time),
    ])).filter((time) => time >= startTime && time <= endTime).sort((a, b) => a - b);

    for (const time of times) {
      const actual = valueAt(actualSignal.samples, time, actualSignal.width);
      const expected = valueAt(expectedSignal.samples, time, expectedSignal.width);
      if (actual !== expected) {
        mismatches.push({ signal: port, time, expected, actual });
        break;
      }
    }
  }

  return mismatches;
}

function stopTestbenchAt(testbenchSource: string, stopAt?: number): string {
  if (!stopAt || stopAt <= 0) return testbenchSource;
  return testbenchSource.replace(/endmodule\s*$/i, `\n  initial begin\n    #${Math.floor(stopAt)};\n    $finish;\n  end\nendmodule\n`);
}

async function runSimulation(source: string, testbenchSource: string, testbenchFile: string, topModule: string, workDir: string, stopAt?: number): Promise<SimulationResult> {
  const sourceFile = path.join(workDir, 'candidate.sv');
  const testbenchCopy = path.join(workDir, path.basename(testbenchFile));
  const vcdPath = path.join(workDir, 'dump.vcd');

  await mkdir(workDir, { recursive: true });
  await writeFile(sourceFile, source, 'utf8');
  await writeFile(testbenchCopy, stopTestbenchAt(testbenchSource, stopAt), 'utf8');

  const buildArgs = [
    '--binary',
    '--sv',
    '--timing',
    '--trace',
    '--top-module',
    topModule,
    '-Wno-fatal',
    '-Wno-DECLFILENAME',
    ...resolveWindowsMakeFlags(),
    '-Mdir',
    path.join(workDir, 'obj_dir'),
    sourceFile,
    testbenchCopy,
  ];

  const build = await runVerilatorBuild(buildArgs, workDir);
  if (build.code !== 0) {
    const combined = `${build.stdout}\n${build.stderr}`;
    return {
      ok: false,
      status: build.timedOut ? 'timeout' : 'compile_error',
      sourceFile,
      testbenchCopy,
      vcdPath,
      command: `verilator ${buildArgs.join(' ')}`,
      stdout: build.stdout,
      stderr: build.stderr,
      diagnostics: extractDiagnostics(combined),
    };
  }

  const binaryName = `V${topModule}${process.platform === 'win32' ? '.exe' : ''}`;
  const executable = path.join(workDir, 'obj_dir', binaryName);
  const execute = await runProcess(executable, [], workDir, 15_000);
  const fullStdout = `${build.stdout}${execute.stdout}`;
  const fullStderr = `${build.stderr}${execute.stderr}`;
  const diagnostics = extractDiagnostics(`${fullStdout}\n${fullStderr}`);
  const quietStdout = stripBuildNoise(fullStdout);

  let waveform: WaveformData | undefined;
  let vcd: ParsedVcd | undefined;
  try {
    const vcdText = await readFile(vcdPath, 'utf8');
    vcd = parseFullVcd(vcdText);
    waveform = parseVcd(vcdText);
  } catch {
    vcd = undefined;
    waveform = undefined;
  }

  return {
    ok: execute.code === 0,
    status: execute.timedOut ? 'timeout' : execute.code === 0 ? 'completed' : 'runtime_error',
    sourceFile,
    testbenchCopy,
    vcdPath: await resolveVcdPath(vcdPath),
    command: `verilator ${buildArgs.join(' ')}`,
    stdout: quietStdout,
    stderr: fullStderr,
    diagnostics,
    waveform,
    vcd,
  };
}

function maxVcdTime(vcd: ParsedVcd): number {
  return Math.max(1, ...Array.from(vcd.signalByName.values()).flatMap((signal) => signal.samples.map((sample) => sample.time)));
}

function gradeCases(
  candidate: ParsedVcd,
  reference: ParsedVcd,
  outputPorts: string[],
  count: number,
  startTime: number,
  endTime: number,
  prefix: string,
): { passed: number; total: number; cases: PublicCaseResult[]; mismatches: ComparisonMismatch[] } {
  const duration = Math.max(1, endTime - startTime);
  const cases: PublicCaseResult[] = [];
  const allMismatches: ComparisonMismatch[] = [];

  for (let index = 0; index < count; index += 1) {
    const caseStart = startTime + Math.floor((duration * index) / count);
    const caseEnd = index === count - 1
      ? endTime
      : startTime + Math.floor((duration * (index + 1)) / count) - 1;
    const mismatches = compareOutputWaveforms(candidate, reference, outputPorts, caseStart, Math.max(caseStart, caseEnd));
    allMismatches.push(...mismatches);
    const first = mismatches[0];
    cases.push(first ? {
      id: `${prefix}-${index + 1}`,
      status: 'failed',
      expected: first.expected,
      actual: first.actual,
      message: `${first.signal} differs at ${first.time}ps.`,
    } : {
      id: `${prefix}-${index + 1}`,
      status: 'passed',
    });
  }

  return {
    passed: cases.filter((testCase) => testCase.status === 'passed').length,
    total: count,
    cases,
    mismatches: allMismatches,
  };
}

function failedGrade(
  status: GradeResult['status'],
  visibleCount: number,
  simulation: SimulationResult,
): GradeResult {
  return {
    status,
    public: {
      passed: 0,
      total: visibleCount,
      cases: Array.from({ length: visibleCount }, (_, index) => ({
        id: `public-${index + 1}`,
        status: 'failed',
        message: status === 'compile_error' ? 'Compilation failed.' : 'Simulation did not complete.',
      })),
    },
    diagnostics: simulation.diagnostics,
    stdout: simulation.stdout,
    stderr: simulation.stderr,
    vcdPath: simulation.vcdPath,
    waveform: simulation.waveform,
  };
}

export async function gradeVerilatorQuestion(request: GradeRequest): Promise<GradeResult> {
  const config = getQuestionConfig(request.questionId);
  if (!config) {
    throw new Error(`Unknown question ID: ${request.questionId}`);
  }

  const testbenchFile = path.join(process.cwd(), 'solutions', `${config.assetBase}_tb.sv`);
  const referenceFile = path.join(process.cwd(), 'solutions', `${config.assetBase}_rtl.sv`);
  const [testbenchSource, referenceSource] = await Promise.all([
    readFile(testbenchFile, 'utf8'),
    readFile(referenceFile, 'utf8'),
  ]);
  const topModule = resolveTopModule(testbenchSource);
  const outputPorts = parseOutputPorts(referenceSource);
  if (outputPorts.length === 0) {
    throw new Error(`No output ports found in reference RTL for ${config.id}.`);
  }

  const runRoot = path.join(process.cwd(), '.chipdev', 'runs', config.id);
  await mkdir(runRoot, { recursive: true });
  const workDir = await mkdtemp(path.join(runRoot, `${Date.now()}-`));

  let referencePromise = referenceCache.get(config.id);
  if (!referencePromise) {
    const referenceWorkDir = path.join(process.cwd(), '.chipdev', 'reference-cache', config.id);
    referencePromise = runSimulation(referenceSource, testbenchSource, testbenchFile, topModule, referenceWorkDir);
    referenceCache.set(config.id, referencePromise);
  }
  const reference = await referencePromise;
  if (!reference.ok || !reference.vcd) {
    referenceCache.delete(config.id);
    return failedGrade('internal_error', config.visibleCount, reference);
  }

  const endTime = maxVcdTime(reference.vcd);
  const publicEnd = Math.max(1, Math.floor(endTime * config.visibleCount / (config.visibleCount + config.hiddenCount)));
  const candidate = request.mode === 'submit' && request.source.trim() === referenceSource.trim()
    ? reference
    : await runSimulation(
      request.source,
      testbenchSource,
      testbenchFile,
      topModule,
      path.join(workDir, 'candidate'),
      request.mode === 'run' ? publicEnd : undefined,
    );

  if (!candidate.ok || !candidate.vcd) {
    const status = candidate.status === 'compile_error'
      ? 'compile_error'
      : candidate.status === 'timeout' ? 'timeout' : 'runtime_error';
    return failedGrade(status, config.visibleCount, candidate);
  }

  const publicGrade = gradeCases(
    candidate.vcd,
    reference.vcd,
    outputPorts,
    config.visibleCount,
    0,
    publicEnd,
    'public',
  );
  const publicResult = {
    passed: publicGrade.passed,
    total: publicGrade.total,
    cases: publicGrade.cases,
  };

  if (request.mode === 'run') {
    const passed = publicGrade.passed === publicGrade.total;
    return {
      status: passed ? 'accepted' : 'wrong_answer',
      public: publicResult,
      diagnostics: passed ? candidate.diagnostics : [
        `${publicGrade.total - publicGrade.passed} public case(s) failed.`,
        ...candidate.diagnostics,
      ],
      stdout: candidate.stdout,
      stderr: candidate.stderr,
      vcdPath: candidate.vcdPath,
      waveform: candidate.waveform,
    };
  }

  const hiddenGrade = gradeCases(
    candidate.vcd,
    reference.vcd,
    outputPorts,
    config.hiddenCount,
    publicEnd + 1,
    endTime,
    'hidden',
  );
  const accepted = publicGrade.passed === publicGrade.total && hiddenGrade.passed === hiddenGrade.total;
  return {
    status: accepted ? 'accepted' : 'wrong_answer',
    public: publicResult,
    hidden: { passed: hiddenGrade.passed, total: hiddenGrade.total },
    diagnostics: accepted ? candidate.diagnostics : [
      `${publicGrade.passed}/${publicGrade.total} public and ${hiddenGrade.passed}/${hiddenGrade.total} hidden cases passed.`,
      ...candidate.diagnostics,
    ],
    stdout: candidate.stdout,
    stderr: candidate.stderr,
  };
}

export async function runVerilatorQuestion(request: RunRequest): Promise<RunResult> {
  const questionBase = resolveQuestionBase(request.questionFileName);
  const testbenchFile = resolveTestbenchPath(request.questionFileName);
  const referenceFile = path.join(process.cwd(), 'solutions', `${questionBase}_rtl.sv`);
  const testbenchSource = await readFile(testbenchFile, 'utf8');
  const referenceSource = await readFile(referenceFile, 'utf8');
  const topModule = resolveTopModule(testbenchSource);
  const outputPorts = parseOutputPorts(referenceSource);
  const runRoot = path.join(process.cwd(), '.chipdev', 'runs', questionBase);
  await mkdir(runRoot, { recursive: true });
  const workDir = await mkdtemp(path.join(runRoot, `${Date.now()}-`));

  const candidate = await runSimulation(request.source, testbenchSource, testbenchFile, topModule, path.join(workDir, 'candidate'));
  if (!candidate.ok || !candidate.vcd) {
    return {
      ok: false,
      checked: true,
      status: candidate.status === 'completed' || candidate.status === 'timeout' ? 'runtime_error' : candidate.status,
      verdict: 'failed',
      questionFileName: request.questionFileName,
      testbenchFile,
      vcdPath: candidate.vcdPath,
      command: candidate.command,
      stdout: candidate.stdout,
      stderr: candidate.stderr,
      diagnostics: candidate.diagnostics,
      waveform: candidate.waveform,
    };
  }

  const reference = await runSimulation(referenceSource, testbenchSource, testbenchFile, topModule, path.join(workDir, 'reference'));
  if (!reference.ok || !reference.vcd) {
    return {
      ok: false,
      checked: true,
      status: 'runtime_error',
      verdict: 'failed',
      questionFileName: request.questionFileName,
      testbenchFile,
      vcdPath: candidate.vcdPath,
      command: candidate.command,
      stdout: candidate.stdout,
      stderr: [
        candidate.stderr,
        'Reference simulation failed, so candidate output could not be graded.',
        reference.stderr,
      ].filter(Boolean).join('\n'),
      diagnostics: [...candidate.diagnostics, ...reference.diagnostics],
      waveform: candidate.waveform,
    };
  }

  const mismatches = compareOutputWaveforms(candidate.vcd, reference.vcd, outputPorts);
  const passed = mismatches.length === 0;
  const comparisonSummary = passed
    ? `PASS: candidate output waveforms match reference for ${outputPorts.join(', ')}.`
    : `FAIL: ${mismatches.length} output mismatch(es).\n${mismatches
      .slice(0, 10)
      .map((mismatch) => `${mismatch.signal} at ${mismatch.time}ps: expected ${mismatch.expected}, got ${mismatch.actual}`)
      .join('\n')}`;

  return {
    ok: passed,
    checked: true,
    status: passed ? 'passed' : 'failed',
    verdict: passed ? 'passed' : 'failed',
    questionFileName: request.questionFileName,
    testbenchFile,
    vcdPath: candidate.vcdPath,
    command: candidate.command,
    stdout: [comparisonSummary, candidate.stdout].filter(Boolean).join('\n\n'),
    stderr: candidate.stderr,
    diagnostics: passed ? candidate.diagnostics : [comparisonSummary, ...candidate.diagnostics],
    mismatches,
    waveform: candidate.waveform,
  };
}
