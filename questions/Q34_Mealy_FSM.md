# Q34. Mealy FSM

Design a Mealy finite-state machine whose output depends on both the current state and the current input. Unlike a Moore machine, the output may change immediately when the input changes, without waiting for a clock edge to reach a new state first.

Module interface:
```systemverilog
module mealy_fsm (
  input logic clk,
  input logic resetn,
  input logic din,
  output logic dout
);
```

Behavior expectations:
Detect the overlapping bit pattern `1010`. `resetn` is sampled synchronously and active low. Assert `dout` combinationally on the same cycle that the final `0` arrives.

Sample case:
When the triggering input sequence is observed, the output should assert on the same cycle that the final input bit arrives.
