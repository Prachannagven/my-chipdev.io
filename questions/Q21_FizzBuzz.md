# Q21. FizzBuzz

Create a clocked FizzBuzz generator. The design should count cycles, reset back to zero on reset, and assert `fizz` when the count is divisible by `FIZZ`, `buzz` when divisible by `BUZZ`, and `fizzbuzz` when both conditions are true.

Module interface:
```systemverilog
module fizzbuzz #(parameter FIZZ=2, BUZZ=3, MAX_CYCLES=20) (
  input clk,
  input resetn,
  output logic fizz,
  output logic buzz,
  output logic fizzbuzz
);
```

Sample case:
With the default parameters, cycle counts such as `6` should assert both `fizz` and `buzz`, while `2` should assert only `fizz`.
