# Q17. Divisible by 5

Build a sequential detector that reads one input bit per clock and asserts the output when the bits seen so far represent a binary number divisible by 5. Reset clears the running state.

Module interface:
```systemverilog
module divisible_by_5 (
  input clk,
  input resetn,
  input din,
  output logic dout
);
```

Sample case:
For the serial stream `1, 0, 1` representing binary `101` (decimal 5), the output should assert after the last bit.
