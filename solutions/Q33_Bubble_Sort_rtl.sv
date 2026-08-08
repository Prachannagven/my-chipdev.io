module bubble_sort #(
  parameter NUM_VALUES = 4,
  parameter DATA_WIDTH = 8
) (
  input logic [NUM_VALUES-1:0][DATA_WIDTH-1:0] values_in,
  output logic [NUM_VALUES-1:0][DATA_WIDTH-1:0] values_out
);
  logic [DATA_WIDTH-1:0] temp;
  integer i;
  integer j;
  always_comb begin
    values_out = values_in;
    temp = '0;
    for (i = 0; i < NUM_VALUES - 1; i = i + 1) begin
      for (j = 0; j < NUM_VALUES - i - 1; j = j + 1) begin
        if (values_out[j] > values_out[j + 1]) begin
          temp = values_out[j];
          values_out[j] = values_out[j + 1];
          values_out[j + 1] = temp;
        end
      end
    end
  end
endmodule
