module carry_select_adder #(
  parameter DATA_WIDTH = 8,
  parameter BLOCK_WIDTH = 4
) (
  input logic [DATA_WIDTH-1:0] a,
  input logic [DATA_WIDTH-1:0] b,
  input logic cin,
  output logic [DATA_WIDTH-1:0] sum,
  output logic cout
);
  always_comb {cout, sum} = a + b + cin;
endmodule
