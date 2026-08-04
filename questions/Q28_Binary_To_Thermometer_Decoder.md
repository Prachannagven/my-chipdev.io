# Q28. Binary to Thermometer Decoder

Convert an 8-bit binary input into a 256-bit thermometer code. The output should contain a run of `1`s from bit 0 up through the selected count, with all higher bits cleared.

Module interface:
```systemverilog
module binary_to_thermometer_decoder (
  input [7:0] din,
  output reg [255:0] dout
);
```

Sample case:
Input `din = 3` should produce `dout` with bits `[3:0] = 4'b1111` and all higher bits `0`.
