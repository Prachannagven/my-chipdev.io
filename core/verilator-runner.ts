import { access, mkdir, mkdtemp, readFile, writeFile } from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import { spawn } from 'node:child_process';

export type RunRequest = {
  questionFileName: string;
  source: string;
};

export type RunResult = {
  ok: boolean;
  questionFileName: string;
  testbenchFile: string;
  vcdPath: string;
  command: string;
  stdout: string;
  stderr: string;
  diagnostics: string[];
  waveform?: WaveformData;
};

export type WaveformData = {
  times: number[];
  signals: Array<{
    name: string;
    width: number;
    values: string[];
  }>;
};

function runProcess(command: string, args: string[], cwd: string): Promise<{ code: number; stdout: string; stderr: string }> {
  return new Promise((resolve, reject) => {
    const child = spawn(command, args, {
      cwd,
      shell: false,
      stdio: ['ignore', 'pipe', 'pipe'],
    });

    let stdout = '';
    let stderr = '';

    child.stdout.setEncoding('utf8');
    child.stderr.setEncoding('utf8');
    child.stdout.on('data', (chunk) => {
      stdout += chunk;
    });
    child.stderr.on('data', (chunk) => {
      stderr += chunk;
    });

    child.on('error', reject);
    child.on('close', (code) => {
      resolve({ code: code ?? 1, stdout, stderr });
    });
  });
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
        trimmed.startsWith('python3 /usr/share/verilator/bin/verilator_includer') ||
        trimmed.startsWith('echo "" >') ||
        trimmed.startsWith('rm V')
      ) {
        return false;
      }

      return true;
    })
    .join('\n');
}

function parseVcd(vcdText: string, maxSignals = 10, maxTimes = 80): WaveformData {
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
          const name = parts.slice(4, parts.length - 1).join(' ');
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

  const selectedSignals = Array.from(idToSignal.entries())
    .filter(([id]) => rawSamples.has(id))
    .slice(0, maxSignals);

  const allTimes = new Set<number>();
  for (const [id] of selectedSignals) {
    const entries = rawSamples.get(id) ?? [];
    for (const entry of entries) {
      allTimes.add(entry.time);
    }
  }

  const times = Array.from(allTimes).sort((a, b) => a - b).slice(0, maxTimes);

  const signals = selectedSignals.map(([id, signal]) => {
    const entries = rawSamples.get(id) ?? [];
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
      name: signal.name,
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

export async function runVerilatorQuestion(request: RunRequest): Promise<RunResult> {
  const verilator = 'verilator';
  const testbenchFile = resolveTestbenchPath(request.questionFileName);
  const testbenchSource = await readFile(testbenchFile, 'utf8');
  const topModule = resolveTopModule(testbenchSource);
  const runRoot = path.join(process.cwd(), '.chipdev', 'runs', resolveQuestionBase(request.questionFileName));
  await mkdir(runRoot, { recursive: true });
  const workDir = await mkdtemp(path.join(runRoot, `${Date.now()}-`));
  const sourceFile = path.join(workDir, 'candidate.sv');
  const testbenchCopy = path.join(workDir, path.basename(testbenchFile));
  const vcdPath = path.join(workDir, 'dump.vcd');

  await writeFile(sourceFile, request.source, 'utf8');
  await writeFile(testbenchCopy, testbenchSource, 'utf8');

  const buildArgs = [
    '--binary',
    '--sv',
    '--timing',
    '--trace',
    '--top-module',
    topModule,
    '-Wno-fatal',
    '-Wno-DECLFILENAME',
    '-Mdir',
    path.join(workDir, 'obj_dir'),
    sourceFile,
    testbenchCopy,
  ];

  const build = await runProcess(verilator, buildArgs, workDir);
  if (build.code !== 0) {
    const combined = `${build.stdout}\n${build.stderr}`;
    return {
      ok: false,
      questionFileName: request.questionFileName,
      testbenchFile,
      vcdPath,
      command: `${verilator} ${buildArgs.join(' ')}`,
      stdout: build.stdout,
      stderr: build.stderr,
      diagnostics: extractDiagnostics(combined),
    };
  }

  const binaryName = `V${topModule}`;
  const executable = path.join(workDir, 'obj_dir', binaryName);
  const execute = await runProcess(executable, [], workDir);
  const fullStdout = `${build.stdout}${execute.stdout}`;
  const fullStderr = `${build.stderr}${execute.stderr}`;
  const diagnostics = extractDiagnostics(`${fullStdout}\n${fullStderr}`);
  const quietStdout = stripBuildNoise(fullStdout);

  let waveform: WaveformData | undefined;
  try {
    const vcdText = await readFile(vcdPath, 'utf8');
    waveform = parseVcd(vcdText);
  } catch {
    waveform = undefined;
  }

  return {
    ok: execute.code === 0,
    questionFileName: request.questionFileName,
    testbenchFile,
    vcdPath: await resolveVcdPath(vcdPath),
    command: `${verilator} ${buildArgs.join(' ')}`,
    stdout: quietStdout,
    stderr: fullStderr,
    diagnostics,
    waveform,
  };
}
