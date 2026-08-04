# Q32. Carry-Select Adder

Design a multi-bit adder that uses carry-select structure to reduce carry propagation delay. Split the operands into blocks, precompute each block for carry-in `0` and `1`, and select the correct result once the incoming carry is known.

Behavior expectations:
The output must match ordinary binary addition for all input pairs, including cases that overflow the declared width.

Sample case:
For `a = 8'd19` and `b = 8'd23`, the sum should be `8'd42`.
