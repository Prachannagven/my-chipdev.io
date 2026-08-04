# Q08. Serial-in, Parallel-out Shift Register

Build a shift register that accepts one bit of serial input per clock and accumulates it into a parallel output word. On reset, the register clears to zero. New bits should enter at bit 0, with older bits shifting left.

Module interface:
```systemverilog
module SIPO_shift_register #(parameter DATA_WIDTH=16) (
  input clk,
  input resetn,
  input din,
  output [DATA_WIDTH-1:0] dout
);
```

Sample case:
Starting from reset, input bits `1, 0, 1, 1` should produce `dout = 4'b1101` after four clocks.
