# Q14. Stopwatch Timer

Implement a stopwatch-style counter with reset, start, and stop controls. Reset clears the count. When start is asserted, the count increments on each clock until it reaches `MAX`, then wraps to zero. When stop is asserted, the count holds its current value.

Module interface:
```systemverilog
module stopwatch_timer #(parameter DATA_WIDTH=16, MAX=99) (
  input clk,
  input reset,
  input start,
  input stop,
  output logic [DATA_WIDTH-1:0] count
);
```

Sample case:
With `MAX = 9`, start from reset, assert `start` for 3 cycles, and the count should advance `0 -> 1 -> 2 -> 3`.
