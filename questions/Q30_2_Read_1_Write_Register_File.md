# Q30. 2-Read 1-Write Register File

Design a register file with one write port and two independent read ports. Writes occur on the rising clock edge. Reads should return previously written data, and any address collision between simultaneous accesses should raise `collision`. Reset clears the file and all status state.

Module interface:
```systemverilog
module tworead1write_register_file #(parameter DATA_WIDTH=16) (
  input clk,
  input resetn,
  input [DATA_WIDTH-1:0] din,
  input [$clog2(DATA_WIDTH):0] wad1,
  input [$clog2(DATA_WIDTH):0] rad1,
  input [$clog2(DATA_WIDTH):0] rad2,
  input wen1,
  input ren1,
  input ren2,
  output logic [DATA_WIDTH-1:0] dout1,
  output logic [DATA_WIDTH-1:0] dout2,
  output logic collision
);
```

Sample case:
After writing data to one address, reading it back from either read port should return the stored word. If both read ports target the same address in the same cycle, `collision` should assert.
