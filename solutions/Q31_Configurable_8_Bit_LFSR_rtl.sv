module configurable_8_bit_lfsr (
  input logic clk,
  input logic resetn,
  input logic load,
  input logic [7:0] seed,
  input logic [7:0] taps,
  output logic [7:0] dout
);
  always_ff @(posedge clk) begin
    if (!resetn)
      dout <= 8'b0;
    else if (load)
      dout <= seed;
    else
      dout <= {dout[6:0], ^(dout & taps)};
  end
endmodule
