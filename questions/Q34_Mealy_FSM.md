# Q34. Mealy FSM

Design a Mealy finite-state machine whose output depends on both the current state and the current input. Unlike a Moore machine, the output may change immediately when the input changes, without waiting for a clock edge to reach a new state first.

Behavior expectations:
Choose a sequence-detection style Mealy machine and assert the output on the exact cycle that the triggering input pattern is completed.

Sample case:
When the triggering input sequence is observed, the output should assert on the same cycle that the final input bit arrives.
