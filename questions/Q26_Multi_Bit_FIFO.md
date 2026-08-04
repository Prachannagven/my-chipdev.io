# Q26. Multi-Bit FIFO

Build a small FIFO that stores multiple words and exposes the oldest value on `dout`. The design should track `empty` and `full`, shift older entries when the FIFO is full and a new write arrives, and clear all state on reset.

Module interface:
```systemverilog
module multi_bit_fifo #(parameter DATA_WIDTH=8) (
  input clk,
  input resetn,
  input [DATA_WIDTH-1:0] din,
  input wr,
  output logic [DATA_WIDTH-1:0] dout,
  output logic empty,
  output logic full
);
```

Sample case:
After three writes, `full` should assert and `dout` should hold the oldest stored word.
