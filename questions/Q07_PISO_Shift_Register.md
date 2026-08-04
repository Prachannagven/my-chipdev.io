# Q07. Parallel-in, Serial-out Shift Register

Build a shift register that loads a parallel word when `din_en` is high and then shifts the stored value out serially on each subsequent clock while `din_en` is low. The serial output should present the least-significant bit first.

Module interface:
```systemverilog
module PISO_shift_register #(parameter DATA_WIDTH=16) (
  input clk,
  input resetn,
  input [DATA_WIDTH-1:0] din,
  input din_en,
  output logic dout
);
```

Sample case:
Load `din = 4'b1011`, then deassert `din_en`. The serial stream should be `1, 1, 0, 1`.
