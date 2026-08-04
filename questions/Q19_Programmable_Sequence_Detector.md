# Q19. Programmable Sequence Detector

Design a serial sequence detector whose target pattern is provided at runtime. The 5-bit `init` value is captured after reset and then compared against the next bits shifted in on `din`. Assert `seen` once the incoming 5-bit window matches the stored target.

Module interface:
```systemverilog
module programmable_sequence_detector (
  input clk,
  input resetn,
  input [4:0] init,
  input din,
  output logic seen
);
```

Sample case:
If `init = 5'b10110` and the input stream contains `10110`, then `seen` should go high once the window matches.
