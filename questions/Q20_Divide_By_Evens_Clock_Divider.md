# Q20. Divide-by-Evens Clock Divider

Generate three periodic outputs that behave like divide-by-2, divide-by-4, and divide-by-6 indicators. The outputs are derived from an internal counter that advances on every rising clock edge and clears on reset.

Module interface:
```systemverilog
module divide_by_evens_clock_divider (
  input clk,
  input resetn,
  output logic div2,
  output logic div4,
  output logic div6
);
```

Sample case:
After reset, the outputs should repeat their periodic patterns as the counter advances: `div2` toggles every cycle, `div4` every two cycles, and `div6` every three cycles.
