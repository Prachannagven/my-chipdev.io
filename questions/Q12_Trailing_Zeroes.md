# Q12. Trailing Zeroes

Count the number of consecutive zero bits starting from the least-significant bit until the first `1` is seen. If the input is zero, return the full width count.

Module interface:
```systemverilog
module trailing_zeroes #(parameter DATA_WIDTH=32) (
  input  logic [DATA_WIDTH-1:0] din,
  output logic [$clog2(DATA_WIDTH):0] dout
);
```

Sample case:
Input: `din = 8'b00101000`

Expected output: `3`
