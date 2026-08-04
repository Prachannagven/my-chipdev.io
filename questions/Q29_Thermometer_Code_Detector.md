# Q29. Thermometer Code Detector

Determine whether an input vector follows thermometer encoding. Valid thermometer codes contain a single transition between zeros and ones, in either direction depending on the chosen polarity.

Module interface:
```systemverilog
module thermometer_code_detector #(parameter DATA_WIDTH=8) (
  input [DATA_WIDTH-1:0] codeIn,
  output reg isThermometer
);
```

Sample case:
`codeIn = 8'b00011111` should be accepted, while `codeIn = 8'b00101111` should be rejected.
