# ChipDev Local SystemVerilog Runner

This repository is a local-only SystemVerilog practice environment. It provides:

- A HackerRank-style browser UI with the brief on the left and an editor on the right.
- Separate Run and Submit paths for public and hidden grading.
- Persistent drafts, solved/attempted status, and complete submission history.
- A local Verilator execution path for grading your current code.
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

The browser UI calls this API locally. **Run** grades the visible portion of the deterministic suite and returns case details plus a VCD. **Submit** grades the complete suite, exposes hidden results only as an aggregate, and records the source and verdict under `.chipdev/state.json`.

Public runs emit VCD waveform files under `.chipdev/runs/<question>/`. Submission and hidden waveforms are not returned to the browser.

## Terminal Workflow

Use the CLI from the terminal when you want to stay in Neovim:

```bash
npm run cli -- --question Q01_Simple_Router --source path/to/solution.sv
```

You can also pipe source through standard input.

## Development

```bash
npm run build
npm test
```

These commands validate the browser bundle, persistent state behavior, and the 34-question asset manifest. The local runner uses Verilator directly on your machine, so Verilator must be installed and available on `PATH`.
