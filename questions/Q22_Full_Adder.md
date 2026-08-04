# Q22. Full Adder

Implement a 1-bit full adder. The sum output should be the low bit of `a + b + cin`, and `cout` should be the carry bit.

Module interface:
```systemverilog
module full_adder (
  input a,
  input b,
  input cin,
  output logic sum,
  output logic cout
);
```

Sample case:
Inputs `a=1`, `b=1`, `cin=0` should produce `sum=0` and `cout=1`.
