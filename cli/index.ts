import { readFile } from 'node:fs/promises';
import process from 'node:process';
import { runVerilatorQuestion } from '../core/verilator-runner';

type CliArgs = {
  questionFileName?: string;
  sourcePath?: string;
};

function parseArgs(argv: string[]): CliArgs {
  const result: CliArgs = {};

  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    if (arg === '--question') {
      result.questionFileName = argv[index + 1];
      index += 1;
      continue;
    }

    if (arg === '--source') {
      result.sourcePath = argv[index + 1];
      index += 1;
    }
  }

  return result;
}

async function main() {
  const { questionFileName, sourcePath } = parseArgs(process.argv.slice(2));
  if (!questionFileName || !sourcePath) {
    console.error('Usage: npm run cli -- --question Q01_Simple_Router.md --source path/to/file.sv');
    process.exitCode = 1;
    return;
  }

  const source = await readFile(sourcePath, 'utf8');
  const result = await runVerilatorQuestion({ questionFileName, source });

  console.log(result.stdout);
  if (result.stderr) {
    console.error(result.stderr);
  }

  if (result.vcdPath) {
    console.log(`Waveform VCD: ${result.vcdPath}`);
    console.log('Open that file in GTKWave or another VCD viewer to inspect the trace up to the failure point.');
  }

  if (!result.ok) {
    process.exitCode = 1;
  }
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exitCode = 1;
});
