# Q32. Carry-Select Adder

Design a multi-bit adder that uses carry-select structure to reduce carry propagation delay. Split the operands into blocks, precompute each block for carry-in `0` and `1`, and select the correct result once the incoming carry is known.

Module interface:
```systemverilog
module carry_select_adder #(
  parameter DATA_WIDTH = 8,
  parameter BLOCK_WIDTH = 4
) (
  input logic [DATA_WIDTH-1:0] a,
  input logic [DATA_WIDTH-1:0] b,
  input logic cin,
  output logic [DATA_WIDTH-1:0] sum,
  output logic cout
);
```

Behavior expectations:
The `{cout, sum}` output must match `a + b + cin` for all input combinations, including overflow.

Sample case:
For `a = 8'd19` and `b = 8'd23`, the sum should be `8'd42`.
