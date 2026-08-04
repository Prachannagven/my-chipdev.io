# Q06. Edge Detector

Detect a rising edge on a 1-bit input. The output should assert for the clock cycle in which the input transitions from low to high, and remain low otherwise. Reset clears the detector state.

Module interface:
```systemverilog
module edge_detector (
  input clk,
  input resetn,
  input din,
  output dout
);
```

Sample case:
If `din` goes `0 -> 1 -> 1 -> 0`, the output should pulse high only on the first `1`.
