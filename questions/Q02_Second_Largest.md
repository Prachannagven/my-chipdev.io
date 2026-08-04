# Q02. Second Largest

Design a sequential circuit that tracks the largest and second-largest values seen on `din` since reset. On each rising clock edge, the current input is compared against the running records. The output should always present the second-largest value observed so far.

Module interface:
```systemverilog
module second_largest #(parameter DATA_WIDTH = 32) (
	input  logic [DATA_WIDTH-1:0] din,
	input  logic clk,
	input  logic resetn,
	output logic [DATA_WIDTH-1:0] dout
);
```

Sample case:
After reset, apply inputs `8`, `3`, `14`, `9` on successive clocks.

Expected output after the final clock: `9`.
