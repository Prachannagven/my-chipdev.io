# Q11. Gray Code to Binary

Convert a Gray-coded input word into its binary equivalent. The result must preserve the same width as the input.

Module interface:
```systemverilog
module graycode_to_binary #(parameter DATA_WIDTH=16) (
  input  logic [DATA_WIDTH-1:0] gray,
  output logic [DATA_WIDTH-1:0] bin
);
```

Sample case:
Input: `gray = 4'b0110`

Expected output: `bin = 4'b0100`
