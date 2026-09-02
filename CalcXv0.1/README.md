# CalcX

AI-Powered Mathematics & Engineering Computing Platform. Version 0.2 completes the Level 2 Advanced Calculator milestone with a C++ console application and a standalone browser application.

## Version

`v0.2` — Level 2 / Advanced Calculator

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

## Project structure

```text
CalcXv0.1/
├── src/
│   └── main.cpp
├── web/
│   ├── index.html
│   ├── styles.css
│   └── app.js
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

## Current limitations

- Only one operation is evaluated at a time; expression parsing is not available yet.
- The browser presentation is a standalone JavaScript demo. The C++ console application remains the project’s primary implementation at this milestone.
- There is no calculation history, scientific trigonometry, graphing, or equation solving yet.

## Roadmap

- v0.3 / Level 3: scientific calculator functions
- Later milestones: expression parsing, programmer tools, engineering formulas, history, graphing, and equation solving

## Day 3 development note

Day 3 stabilizes the Level 2 operations, centralizes browser validation and calculation logic, hardens error handling, and documents verification. See [`docs/day-3.md`](docs/day-3.md) for the milestone record.
