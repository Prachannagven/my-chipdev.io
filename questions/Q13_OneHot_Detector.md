# Q13. One-Hot Detector

Determine whether exactly one bit is set in the input vector. The output should be `1` only for one-hot values and `0` otherwise.

Module interface:
```systemverilog
module onehot_detector #(parameter DATA_WIDTH=32) (
  input  logic [DATA_WIDTH-1:0] din,
  output logic onehot
);
```

Sample case:
`din = 8'b00010000` should produce `onehot = 1`, while `din = 8'b00011000` should produce `0`.
