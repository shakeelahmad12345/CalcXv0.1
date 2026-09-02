# CalcX

AI-Powered Mathematics & Engineering Computing Platform.

## Current Version

`v0.6` — Level 6 / Engineering Calculator

CalcX is a dependency-free browser calculator preserving the v0.3 scientific calculator, v0.4 expression engine, and v0.5 programmer calculator.

## Features

- Basic arithmetic, roots, percentage, absolute value, and factorial
- Scientific functions, constants, and DEG/RAD angle modes
- Safe expression tokenizer/parser with precedence, parentheses, unary operators, and nested functions
- Programmer BIN/OCT/DEC/HEX conversion, bitwise operations, shifts, fixed widths, ASCII, and bit manipulation
- Engineering mode with Ohm’s law, power, series/parallel networks, dividers, LED design, RC/RL time constants, frequency/period, wavelength, Nyquist sampling, and power/voltage dB
- Engineering formulas, calculation substitutions, validation, SI normalization, and categorized quick input

## Technology and Structure

Plain HTML/CSS/JavaScript browser application with reusable C++ engineering functions and tests.

```text
CalcXv0.1/
├── src/
│   ├── main.cpp
│   ├── engineering.h
│   └── engineering.cpp
├── tests/
│   └── engineering_test.cpp
├── web/
│   ├── index.html
│   ├── styles.css
│   ├── app.js
│   ├── expression-engine.js
│   ├── programmer-engine.js
│   └── engineering-engine.js
├── docs/
└── README.md
```

## Run

Serve `web/` with any static HTTP server. The verified local preview uses:

```powershell
# from CalcXv0.1/web
php -S localhost:8080
```

Opening `web/index.html` directly also works in modern browsers.

## C++ Build and Tests

```powershell
g++ -std=c++17 -Wall -Wextra -pedantic src/engineering.cpp tests/engineering_test.cpp -o engineering-tests.exe
.\engineering-tests.exe
```

The existing console program is built with the same warning flags from `src/main.cpp`.

## Engineering Formulas

`V = I × R`, `P = V × I`, `Rseries = ΣR`, `1/Rparallel = Σ(1/R)`, `Vout = Vin × R2 / (R1 + R2)`, `τ = RC`, `τ = L/R`, `f = 1/T`, `v = fλ`, `fs ≥ 2fmax`, power `dB = 10 log10(P2/P1)`, and equal-impedance voltage `dB = 20 log10(V2/V1)`.

Engineering inputs are normalized internally to SI units and results use readable prefixes including p, n, µ, m, k, M, and G.

## Testing

Browser verification covers previous modes, representative engineering calculations, formula/result breakdowns, invalid input, search categories, mode switching, runtime errors, and desktop/tablet/mobile overflow. C++ coverage is provided in `tests/engineering_test.cpp`.

## Limitations and Roadmap

The C++ console remains the v0.2 console implementation; v0.6 engineering features are browser-facing with a reusable C++ module. Expression history, a larger formula library, graphing, and equation solving are not implemented.

- v0.6: Engineering calculator (implemented)
- v0.7: Engineering formula library
