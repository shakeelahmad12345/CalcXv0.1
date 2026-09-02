# CalcX

AI-Powered Mathematics & Engineering Computing Platform. Version 0.5 includes the v0.4 expression engine and v0.5 programmer calculator in the browser application, preserving earlier operations.

## Version

`v0.5` — Level 5 / Programmer Calculator

## Current features

- Addition, subtraction, multiplication, and division
- Modulus, power, square root, cube root, percentage, absolute value, and factorial
- Decimal and negative-number support
- Division-by-zero and modulus-by-zero protection
- Domain validation for square root and factorial
- Clear invalid-number and invalid-operator messages
- Repeated calculations plus reset and quit controls
- Responsive browser presentation in `web/` with the same Day 2 operations
- Multiple calculations, clear/reset, and inline input validation
- Scientific sin, cos, tan, asin, acos, atan, log, ln, e^x, pi, and e operations
- DEG and RAD angle modes with inverse-trigonometric output conversion
- Expression tokenizer, recursive-descent parser, precedence, parentheses, unary operators, nested functions, constants, and safe evaluation
- Programmer base conversion for binary, octal, decimal, and hexadecimal
- Bitwise AND, OR, XOR, NOT, shifts, fixed widths, ASCII, and bit manipulation

## Technology used

- C++
- Standard C++ library only
- g++ compiler
- VS Code
- Git

## Features

- Addition, subtraction, multiplication, division, modulus, power, square root, cube root, percentage, absolute value, and factorial
- Percentage uses `percentage × value ÷ 100` (for example, 20% of 500 is 100)
- Modulus accepts whole-number operands and protects against a zero divisor
- Factorial accepts whole numbers from 0 through 170; `0!` is 1
- Finite-number, domain, and operation-specific error handling in the browser and console applications
- Tangent singularity protection and positive-domain validation for logarithms

## Project structure

```text
CalcXv0.1/
├── src/
│   └── main.cpp
├── web/
│   ├── index.html
│   ├── styles.css
│   ├── app.js
│   ├── expression-engine.js
│   └── programmer-engine.js
├── README.md
├── .gitignore
└── LICENSE
```

## How to compile

From the `CalcXv0.1` folder in PowerShell, run:

```powershell
$env:Path = "C:\msys64\ucrt64\bin;$env:Path"
g++ -std=c++17 -Wall -Wextra -pedantic src/main.cpp -o calcx.exe
```

If you open the **MSYS2 UCRT64** terminal instead, the first line is already configured and you only need the `g++` command.

## How to run

```powershell
.\calcx.exe
```

## Browser development

The browser application is plain HTML, CSS, and JavaScript with no external dependencies. From `CalcXv0.1/web`, serve the directory with any local static HTTP server, for example:

```powershell
php -S localhost:8080
```

Then open `http://localhost:8080`. Opening `web/index.html` directly also works in modern browsers.

## Testing

- Compile the C++ application with `-Wall -Wextra -pedantic`.
- Run the browser application and verify all eleven operations, reset, operation switching, responsive layout, and invalid-input paths.
- Required error cases include division/modulus by zero, negative square root, non-whole modulus operands, invalid factorial values, empty input, and non-finite input.

## Example usage

```text
Select operation: ^
Enter base: 2
Enter exponent: 8

Result: 256

Calculate again? (y/n): n
```

## Expression Engine (v0.4)

Enter expressions such as `(25 + 5) * 10 / 2`, `sqrt(abs(-25))`, or `sin(pi / 2)`. The tokenizer produces number, name, operator, and parenthesis tokens; a recursive-descent parser evaluates the token stream with operator precedence and right-associative power. No `eval()` or `Function()` is used. DEG/RAD applies to trigonometric functions.

## Programmer Calculator (v0.5)

Switch to Programmer mode to convert BIN, OCT, DEC, and HEX values. Use AND, OR, XOR, NOT, left/right shifts, 8/16/32/64-bit widths, ASCII conversion, and set/clear/toggle/test bit operations. Input is validated against the selected base and bit positions/counts are bounded by the selected width.

## Current limitations

- Only one operation is evaluated at a time; expression parsing is not available yet.
- The browser presentation is a standalone JavaScript demo. The C++ console application remains the project’s primary implementation at this milestone.
- Scientific, expression, and programmer features are currently available in the browser presentation; the C++ console remains the v0.2 console implementation.
- There is no calculation history, expression parsing, graphing, or equation solving yet.

## Roadmap

- v0.4: expression engine (implemented)
- v0.5: programmer calculator (implemented)
- Later milestones: engineering formulas, history, graphing, and equation solving

## Day 5 and Day 6 development notes

Day 5 adds the expression engine. Day 6 adds the programmer calculator. See [`docs/day-5.md`](docs/day-5.md) and [`docs/day-6.md`](docs/day-6.md).
