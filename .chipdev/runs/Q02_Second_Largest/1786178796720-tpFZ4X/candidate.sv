module second_largest #(
    parameter DATA_WIDTH = 32
) (
    input logic [DATA_WIDTH-1:0] din,
    input logic clk,
    input logic resetn,
    output logic [DATA_WIDTH-1:0] dout
);

    logic [DATA_WIDTH-1:0] largest;
    logic [DATA_WIDTH-1:0] second_largest;

    always @(posedge clk or negedge resetn) begin
        if (din > largest && din) begin
            second_largest <= largest;
            largest <= din;
        end else if (din != largest && din > second_largest) begin
            second_largest <= din;
        end
    end

    assign dout = second_largest;
endmodule
