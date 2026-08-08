# Q33. Bubble Sort

Implement hardware that sorts a small fixed-size vector of values using the bubble-sort algorithm. The design should repeatedly compare adjacent elements, swap when necessary, and finish with the values arranged in nondecreasing order.

Module interface:
```systemverilog
module bubble_sort #(
  parameter NUM_VALUES = 4,
  parameter DATA_WIDTH = 8
) (
  input logic [NUM_VALUES-1:0][DATA_WIDTH-1:0] values_in,
  output logic [NUM_VALUES-1:0][DATA_WIDTH-1:0] values_out
);
```

Behavior expectations:
The combinational output must contain the input values in nondecreasing unsigned order. Index `0` contains the smallest value.

Sample case:
Input values `5, 1, 4, 2` should be sorted to `1, 2, 4, 5`.
