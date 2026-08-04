# Q27. Dot Product

Read two fixed-length 8-bit vectors serially, store them, and compute their dot product once both vectors have been captured. While input words are still being collected, `run` should be low. When the result is ready, `run` should assert and `dout` should present the sum of pairwise products.

Module interface:
```systemverilog
module dot_product (
  input [7:0] din,
  input clk,
  input resetn,
  output reg [17:0] dout,
  output reg run
);
```

Sample case:
If `A = {1, 2, 3}` and `B = {4, 5, 6}`, the output should be `1*4 + 2*5 + 3*6 = 32`.
