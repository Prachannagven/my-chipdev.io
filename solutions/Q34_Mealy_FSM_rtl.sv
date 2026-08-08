module mealy_fsm (
  input logic clk,
  input logic resetn,
  input logic din,
  output logic dout
);
  typedef enum logic [1:0] {IDLE, SEEN_1, SEEN_10, SEEN_101} state_t;
  state_t state, next_state;

  always_ff @(posedge clk) begin
    if (!resetn) state <= IDLE;
    else state <= next_state;
  end

  always_comb begin
    dout = 0;
    case (state)
      IDLE: next_state = din ? SEEN_1 : IDLE;
      SEEN_1: next_state = din ? SEEN_1 : SEEN_10;
      SEEN_10: next_state = din ? SEEN_101 : IDLE;
      SEEN_101: begin
        dout = !din;
        next_state = din ? SEEN_1 : SEEN_10;
      end
      default: next_state = IDLE;
    endcase
  end
endmodule
