module configurable_8_bit_lfsr_tb;
  logic clk = 0;
  logic resetn = 0;
  logic load = 0;
  logic [7:0] seed = 0;
  logic [7:0] taps = 8'b10111000;
  wire [7:0] dout;

  configurable_8_bit_lfsr DUT (.*);
  always #5 clk = ~clk;

  task tick; @(posedge clk); #1; endtask
  task load_seed(input logic [7:0] value, input logic [7:0] tap_value);
    seed = value; taps = tap_value; load = 1; tick(); load = 0;
  endtask

  initial begin
    tick(); resetn = 1;
    load_seed(8'b10110011, 8'b10111000);
    repeat (5) tick();
    resetn = 0; tick(); resetn = 1;
    load_seed(8'b10110011, 8'b10111000);
    repeat (5) tick();
    load_seed(8'h01, 8'b10001110); repeat (8) tick();
    load_seed(8'hff, 8'b11100001); repeat (8) tick();
    load_seed(8'h00, 8'b10111000); repeat (3) tick();
    load_seed(8'h5a, 8'b00000001); repeat (5) tick();
    resetn = 0; tick();
    $finish;
  end

  initial begin $dumpfile("dump.vcd"); $dumpvars; end
endmodule
