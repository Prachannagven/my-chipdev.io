# ChipDev Local SystemVerilog Runner

ChipDev is a local SystemVerilog practice environment with a HackerRank-style browser interface and a Verilator-based grading system.

It provides:

* A browser UI with the problem brief on the left and an editor on the right.
* Separate **Run** and **Submit** paths for public and hidden grading.
* Persistent drafts, solved/attempted status, and submission history.
* Verilator-based SystemVerilog compilation and simulation.
* VCD waveform generation for public runs.
* A terminal/CLI workflow for users who prefer Neovim.
* A fully containerized development and grading environment using Docker Compose.

## Quick Start

### Prerequisites

You only need:

* Docker
* Docker Compose

Modern Docker installations provide Compose as:

```bash
docker compose
```

You do **not** need to install Node.js, npm, Verilator, or GCC on the host machine.

### Start ChipDev

From the repository root:

```bash
make
```

This builds the required Docker images and starts the frontend and API services.

Alternatively, run:

```bash
docker compose up --build
```

Once the services are running, open:

```text
http://localhost:5173
```

The API runs internally on port `8787`.

The architecture is:

```text
Browser
   │
   ▼
Vite frontend :5173
   │
   │ /api
   ▼
Node API :8787
   │
   ├── Verilator
   ├── GCC
   └── SystemVerilog simulation
```

The frontend and API communicate over the Docker Compose network. The API is therefore addressed as `api:8787` from the frontend container.

### Stopping ChipDev

Press `Ctrl+C` in the terminal running Compose, or run:

```bash
docker compose down
```

To start it again:

```bash
make
```

## Browser UI

After starting the Docker Compose stack, open the Vite URL:

```text
http://localhost:5173
```

The frontend runs inside Docker, so `npm run dev` is **not required on the host**.

The API is responsible for compiling and running submitted SystemVerilog.

### Run

**Run** executes the visible portion of the deterministic test suite.

Public test results and VCD waveform information can be returned to the browser.

### Submit

**Submit** executes the complete grading suite, including hidden tests.

Hidden results are only exposed as an aggregate verdict. Submission source and grading information are stored by the local application.

## Verilator Execution

The API container contains the complete SystemVerilog execution environment:

* Node.js
* Verilator
* GCC
* Make
* Project dependencies

A typical grading operation is:

```text
SystemVerilog source
        │
        ▼
    Verilator
        │
        ▼
 generated C++
        │
        ▼
       GCC
        │
        ▼
 simulation executable
        │
        ▼
     testbench
        │
        ▼
     pass/fail
```

Public run artifacts, including VCD waveforms, are generated under:

```text
.chipdev/runs/<question>/
```

## Terminal Workflow

The CLI can also be used from the terminal.

When the Compose stack is running, invoke it inside the API container:

```bash
docker compose exec api npm run cli -- \
  --question Q01_Simple_Router \
  --source path/to/solution.sv
```

Source can also be provided through standard input.

This makes it possible to keep the entire development workflow inside Neovim without installing the simulator toolchain on the host.

## Development

### Run tests

With the Compose stack running:

```bash
docker compose exec api npm test
```

### Build the frontend

```bash
docker compose exec api npm run build
```

### Check the running services

```bash
docker compose ps
```

### View API logs

```bash
docker compose logs -f api
```

### View frontend logs

```bash
docker compose logs -f frontend
```

### Open a shell in the API container

```bash
docker compose exec api bash
```

This is useful for inspecting the Verilator environment or debugging the grading pipeline.

For example:

```bash
docker compose exec api verilator --version
```

## Project Layout

* `questions/` contains the long-form Markdown briefs.
* `solutions/` contains the reference RTL and testbenches for the existing question set.
* `src/` contains the browser UI.
* `server/` contains the local API that invokes the Verilator runner.
* `cli/` contains the terminal entrypoint.
* `core/` contains shared runner logic.
* `docs/Questions_List.md` contains the source question index.
* `Dockerfile` defines the API/simulation environment.
* `Dockerfile.frontend` defines the frontend development environment.
* `docker-compose.yml` defines the complete local development stack.

## Docker Development

The repository uses two containers:

### API

The API container provides:

```text
Node.js
Verilator
GCC
npm dependencies
ChipDev server
```

It listens on:

```text
0.0.0.0:8787
```

### Frontend

The frontend container provides:

```text
Node.js
npm dependencies
Vite
```

It listens on:

```text
0.0.0.0:5173
```

The source tree is mounted into the frontend container so Vite hot reload continues to work during development.

## Host-Based Development

Docker is the recommended development environment.

If you intentionally want to run the application without Docker, the host must provide Node.js/npm and Verilator.

Install the project dependencies:

```bash
npm ci
```

Start the API:

```bash
npm run api
```

In another terminal, start the frontend:

```bash
npm run dev
```

The browser frontend expects the API at:

```text
http://127.0.0.1:8787
```

The host-based workflow is primarily useful for debugging the application itself. The Docker environment should be used when testing the actual grading environment.

## Validation

The project includes tests covering the question manifest and persistent application state.

Run:

```bash
docker compose exec api npm test
```

Build the production frontend bundle with:

```bash
docker compose exec api npm run build
```

A successful setup should pass both commands without requiring any host-installed Node.js or Verilator.

## Notes

The Docker environment intentionally keeps the simulator toolchain separate from the host environment. This ensures that contributors use the same general Node.js, Verilator, compiler, and project dependency environment when developing and testing ChipDev.

The simulator executes submitted SystemVerilog by generating and compiling native code. The current Docker setup is intended for local development and trusted use; additional sandboxing and resource restrictions should be added before exposing the grading API to untrusted users over a network.

