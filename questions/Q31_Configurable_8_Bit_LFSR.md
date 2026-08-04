# Q31. Configurable 8-Bit LFSR

Design a configurable 8-bit linear feedback shift register. The circuit should support loading a seed value and selecting feedback taps at runtime so that different pseudo-random sequences can be generated.

Behavior expectations:
The register should initialize from the provided seed, advance one step per clock, and update its output deterministically from the chosen taps. A good implementation should be able to reproduce the same sequence when reset and re-seeded with the same configuration.

Sample case:
Load seed `8'b10110011`, then clock the design forward. The output should change on each clock edge and remain reproducible for the same seed and tap selection.
