# Q04. Gray Code Counter

Create a counter that steps through Gray code values on each clock edge. After reset, the counter should start from the first non-zero Gray value and continue until the maximum value for the chosen width is reached.

Module interface:
```systemverilog
module gray_code_generator #(parameter DATA_WIDTH = 4) (
  input clk,
  input resetn,
  output logic [DATA_WIDTH-1:0] out
);
```

Sample case:
After reset deasserts, the first output should be `4'b0001`, followed by the corresponding Gray sequence for the width.
