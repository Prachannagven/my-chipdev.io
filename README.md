# ChipDev Local SystemVerilog Runner

This repository is a local-only SystemVerilog practice environment. It provides:

- A HackerRank-style browser UI with the brief on the left and an editor on the right.
- A local Verilator execution path for running a question against your current code.
- A terminal-first workflow so you can stay in Neovim when you want to.

## Layout

- `questions/` contains the long-form markdown briefs.
- `solutions/` contains the reference RTL and testbenches for the existing question set.
- `src/` contains the browser UI.
- `server/` will contain the local API that invokes Verilator.
- `cli/` will contain the terminal entrypoint.
- `core/` will contain shared runner logic.
- `docs/Questions_List.md` keeps the source question index outside the repo root.

## Browser UI

Run the browser app with:

```bash
npm install
npm run dev
```

Then open the local Vite URL printed in the terminal.

## Verilator API

Start the local execution API in a second terminal with:

```bash
npm run api
```

The browser UI will call this API locally to compile your submission with Verilator and run the question testbench.

Every run emits a VCD waveform file under `.chipdev/runs/<question>/<timestamp>/dump.vcd`. If a simulation fails at runtime, the waveform still captures the activity up to the failure point, so you can inspect the bug in GTKWave or another VCD viewer.

## Terminal Workflow

Use the CLI from the terminal when you want to stay in Neovim:

```bash
npm run cli -- --question Q01_Simple_Router --source path/to/solution.sv
```

You can also pipe source in through standard input once the CLI lands.

## Development

```bash
npm run build
```

This validates the browser app bundle. The local runner uses Verilator directly on your machine, so Verilator must be installed and available on `PATH`.
