# CalcX Day 6 — Engineering Calculator

## Objective

Deliver Level 6, CalcX v0.6 Engineering Calculator while preserving the v0.3 scientific, v0.4 expression, and v0.5 programmer modes.

## What Was Implemented

Engineering is a distinct top-level mode with separate sections for Circuit Laws, Power, Resistor Networks, Dividers, LED & Component Design, RC/RL Time Constants, Frequency & Waves, Sampling, Decibels, and Engineering Reference. Every calculation displays a formula, substitution, result, and status.

## Formulas

- Ohm’s law: `V = I × R`; power: `P = V × I`
- Series: `Rtotal = ΣR`; parallel: `1/Rtotal = Σ(1/R)`
- Voltage divider: `Vout = Vin × R2 / (R1 + R2)`
- Current divider: `I1 = Itotal × R2 / (R1 + R2)` and `I2 = Itotal × R1 / (R1 + R2)`
- LED: `R = (Vs - Vf) / I`; dissipation: `P = I²R`
- RC/RL: `τ = R × C`; `τ = L / R`
- Waves: `f = 1/T`; `v = fλ`
- Sampling: `fs ≥ 2 × fmax`
- Decibels: `10 log10` for power and `20 log10` for equal-impedance voltage ratios

## Inputs and Outputs

Forms validate finite, positive, non-negative, non-zero-divisor, and domain-specific values. Component and frequency values are normalized through SI units and formatted using engineering prefixes. Outputs include units and a calculation breakdown; LED output includes a resistor-rating warning.

## Testing

Browser verification passed representative values for every category, invalid resistance, formula/result rendering, quick-search categories, mode switching, no runtime errors, and desktop/tablet/mobile layout. `tests/engineering_test.cpp` contains C++ unit coverage for the core formulas. The local MSYS2 compiler exits silently before producing an executable on this OneDrive-backed path, so the C++ test executable could not be run in this environment.

## Architecture

`web/engineering-engine.js` owns reusable engineering formulas and validation; `app.js` owns event handling and presentation. `src/engineering.h` and `src/engineering.cpp` provide the C++ calculation module independently from UI code.

## Version

v0.6

## Next Milestone

CalcX v0.7 — Engineering formula library
