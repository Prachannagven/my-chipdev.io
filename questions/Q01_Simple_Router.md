# Q01. Simple Router

Design a combinational 1-to-4 router. The module accepts a data word, an enable signal, and a 2-bit address. When enabled, the input word must appear on exactly one output selected by the address; the other outputs must be zero. When disabled, all outputs must be zero.

Module interface:
```systemverilog
module simple_router #(parameter DATA_WIDTH=32) (
  input  logic [DATA_WIDTH-1:0] din,
  input  logic d_en,
  input  logic [1:0] addr,
  output logic [DATA_WIDTH-1:0] dout0,
  output logic [DATA_WIDTH-1:0] dout1,
  output logic [DATA_WIDTH-1:0] dout2,
  output logic [DATA_WIDTH-1:0] dout3
);
```

Sample case:
Input: `din = 32'hDEADBEEF`, `d_en = 1`, `addr = 2`

Expected output: `dout2 = 32'hDEADBEEF`, and `dout0 = dout1 = dout3 = 0`.
