# Q05. Reversing Bits

Reverse the bit order of a binary input word. Bit 0 of the input becomes the most-significant bit of the output, and bit `DATA_WIDTH-1` becomes the least-significant bit.

Module interface:
```systemverilog
module reversing_bits #(parameter DATA_WIDTH=32) (
  input  logic [DATA_WIDTH-1:0] din,
  output logic [DATA_WIDTH-1:0] dout
);
```

Sample case:
Input: `din = 8'b11010010`

Expected output: `dout = 8'b01001011`
