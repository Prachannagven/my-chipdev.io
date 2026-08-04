# Q09. Fibonacci Generator

Create a sequential Fibonacci generator. After reset, the output should start at 1 and advance to the next Fibonacci number on each clock edge. Use the chosen width for wraparound or natural truncation.

Module interface:
```systemverilog
module fibonacci_generator #(parameter DATA_WIDTH=32) (
  input clk,
  input resetn,
  output logic [DATA_WIDTH-1:0] dout
);
```

Sample case:
After reset, the output sequence should begin `1, 1, 2, 3, 5, 8, ...`.
