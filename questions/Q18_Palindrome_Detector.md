# Q18. Palindrome Detector

Determine whether a binary word reads the same from left to right and right to left. The output should be `1` for palindromic bit patterns and `0` otherwise.

Module interface:
```systemverilog
module palindrome_detector #(parameter DATA_WIDTH=32) (
  input  logic [DATA_WIDTH-1:0] din,
  output logic dout
);
```

Sample case:
`din = 8'b10011001` should produce `dout = 1`, while `din = 8'b10010101` should produce `0`.
