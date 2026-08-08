# Q31. Configurable 8-Bit LFSR

Design a configurable 8-bit linear feedback shift register. The circuit should support loading a seed value and selecting feedback taps at runtime so that different pseudo-random sequences can be generated.

Module interface:
```systemverilog
module configurable_8_bit_lfsr (
  input logic clk,
  input logic resetn,
  input logic load,
  input logic [7:0] seed,
  input logic [7:0] taps,
  output logic [7:0] dout
);
```

Behavior expectations:
On each rising edge, an asserted active-low `resetn` clears `dout`. Otherwise `load` loads `seed`; normal operation updates `dout` to `{dout[6:0], ^(dout & taps)}`.

Sample case:
Load seed `8'b10110011`, then clock the design forward. The output should change on each clock edge and remain reproducible for the same seed and tap selection.
