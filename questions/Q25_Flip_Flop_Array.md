# Q25. Flip-Flop Array

Implement a small register file built from flip-flops. A write operation stores `din` at the selected address. A read operation returns the stored value from that address only if it has been written before. If read and write are requested together, raise `error`.

Module interface:
```systemverilog
module flip_flop_array (
  input  logic [7:0] din,
  input  logic [2:0] addr,
  input  logic wr,
  input  logic rd,
  input  logic clk,
  input  logic resetn,
  output logic [7:0] dout,
  output logic error
);
```

Sample case:
Write `8'hA5` to address `3`, then read address `3`; the output should return `8'hA5`.
