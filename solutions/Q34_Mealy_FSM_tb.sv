module mealy_fsm_tb;
  logic clk = 0;
  logic resetn = 0;
  logic din = 0;
  wire dout;
  mealy_fsm DUT (.*);
  always #5 clk = ~clk;

  task bit_in(input logic value); din = value; @(posedge clk); #1; endtask
  task reset; resetn = 0; bit_in(0); resetn = 1; endtask

  initial begin
    reset(); bit_in(1); bit_in(0); bit_in(1); din = 0; #3; @(posedge clk); #1;
    reset(); bit_in(1); bit_in(1); bit_in(0); bit_in(0);
    reset(); bit_in(1); bit_in(0); bit_in(1); bit_in(0); bit_in(1); din = 0; #3; @(posedge clk); #1;
    bit_in(1); bit_in(1); bit_in(1); bit_in(0); bit_in(1); bit_in(0);
    reset(); bit_in(0); bit_in(0); bit_in(1); bit_in(0);
    $finish;
  end

  initial begin $dumpfile("dump.vcd"); $dumpvars; end
endmodule
