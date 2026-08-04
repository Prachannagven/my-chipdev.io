# Q03. Rounding Division

Implement integer division with rounding to the nearest result. The quotient is based on a power-of-two divisor, and any remainder at or above half the divisor should round the result up. If the rounded result exceeds the output width, clamp it to the maximum representable value.

Module interface:
```systemverilog
module rounding_division #(
  parameter DIV_LOG2 = 2,
  parameter OUT_WIDTH = 32,
  parameter IN_WIDTH = OUT_WIDTH + DIV_LOG2
) (
  input  logic [IN_WIDTH-1:0] din,
  output logic [OUT_WIDTH-1:0] dout
);
```

Sample case:
Input: `din = 10`, `DIV_LOG2 = 1`

Expected output: `5`
