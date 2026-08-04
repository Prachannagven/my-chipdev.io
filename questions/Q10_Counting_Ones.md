# Q10. Counting Ones

Count the number of set bits in a binary vector and return the population count as an unsigned value wide enough to represent the full range from zero to `DATA_WIDTH`.

Module interface:
```systemverilog
module counting_ones #(parameter DATA_WIDTH=16) (
  input  logic [DATA_WIDTH-1:0] din,
  output logic [$clog2(DATA_WIDTH):0] dout
);
```

Sample case:
Input: `din = 8'b10110100`

Expected output: `4`
