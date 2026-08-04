# Q23. Basic ALU

Build a simple combinational ALU that computes multiple results in parallel: addition, subtraction, bitwise NOT of `a`, bitwise AND, bitwise OR, and bitwise XOR.

Module interface:
```systemverilog
module basic_alu #(parameter DATA_WIDTH=4) (
  input  logic [DATA_WIDTH-1:0] a,
  input  logic [DATA_WIDTH-1:0] b,
  output logic [DATA_WIDTH-1:0] a_plus_b,
  output logic [DATA_WIDTH-1:0] a_minus_b,
  output logic [DATA_WIDTH-1:0] not_a,
  output logic [DATA_WIDTH-1:0] a_and_b,
  output logic [DATA_WIDTH-1:0] a_or_b,
  output logic [DATA_WIDTH-1:0] a_xor_b
);
```

Sample case:
For `a = 4'b0101` and `b = 4'b0011`, the outputs should be `1000`, `0010`, `1010`, `0001`, `0111`, and `0110` respectively.
