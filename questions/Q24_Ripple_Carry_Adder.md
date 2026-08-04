# Q24. Ripple Carry Adder

Design an adder built from chained 1-bit full adders. The `sum` output should include the final carry-out as its most-significant bit.

Module interface:
```systemverilog
module ripple_carry_adder #(parameter DATA_WIDTH=8) (
  input  logic [DATA_WIDTH-1:0] a,
  input  logic [DATA_WIDTH-1:0] b,
  output logic [DATA_WIDTH:0] sum,
  output logic [DATA_WIDTH-1:0] cout_int
);
```

Sample case:
If `a = 8'd5` and `b = 8'd7`, then `sum = 9'd12`.
