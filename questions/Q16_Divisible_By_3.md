# Q16. Divisible by 3

Build a sequential detector that reads one input bit per clock and asserts the output when the bits seen so far represent a binary number divisible by 3. Reset clears the running state.

Module interface:
```systemverilog
module divisible_by_3 (
  input clk,
  input resetn,
  input din,
  output logic dout
);
```

Sample case:
For the serial stream `1, 0, 0, 1` representing binary `1001` (decimal 9), the output should assert after the last bit.
