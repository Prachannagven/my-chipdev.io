module bubble_sort_tb;
  logic [3:0][7:0] values_in = 0;
  wire [3:0][7:0] values_out;
  bubble_sort DUT (.*);

  task stimulus(input logic [7:0] a, b, c, d);
    values_in[0] = a; values_in[1] = b; values_in[2] = c; values_in[3] = d; #10;
  endtask

  initial begin
    stimulus(5, 1, 4, 2);
    stimulus(1, 2, 3, 4);
    stimulus(4, 3, 2, 1);
    stimulus(7, 7, 7, 7);
    stimulus(0, 255, 1, 254);
    stimulus(9, 2, 9, 1);
    stimulus(42, 3, 17, 8);
    $finish;
  end

  initial begin $dumpfile("dump.vcd"); $dumpvars; end
endmodule
