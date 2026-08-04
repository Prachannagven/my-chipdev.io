# Q15. Sequence Detector

Design a finite-state machine that detects the binary pattern `1010` on a serial input stream. The output should pulse high when the sequence has just been observed, then return low on the next cycle unless a new match occurs.

Module interface:
```systemverilog
module sequence_detector (
  input clk,
  input resetn,
  input din,
  output logic dout
);
```

Sample case:
For the serial stream `1, 0, 1, 0`, the output should assert on the fourth clock.
