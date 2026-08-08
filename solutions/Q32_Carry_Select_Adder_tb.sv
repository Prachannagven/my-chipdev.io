module carry_select_adder_tb;
  logic [7:0] a = 0;
  logic [7:0] b = 0;
  logic cin = 0;
  wire [7:0] sum;
  wire cout;
  carry_select_adder DUT (.*);

  task stimulus(input logic [7:0] av, input logic [7:0] bv, input logic cv);
    a = av; b = bv; cin = cv; #10;
  endtask

  initial begin
    stimulus(19, 23, 0);
    stimulus(8'hff, 1, 0);
    stimulus(0, 0, 0);
    stimulus(8'h0f, 1, 0);
    stimulus(8'h7f, 8'h80, 0);
    stimulus(8'haa, 8'h55, 1);
    stimulus(8'hff, 8'hff, 1);
    stimulus(8'h31, 8'hc7, 0);
    $finish;
  end

  initial begin $dumpfile("dump.vcd"); $dumpvars; end
endmodule
