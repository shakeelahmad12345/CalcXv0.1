# CalcX v0.1 — Basic Calculator

CalcX is a beginner-friendly C++ console calculator. It is the first step toward a larger mathematics and engineering computing platform; Day 1 intentionally includes only the basic calculator.

## Version

`v0.1` — Day 1

## Current features

- Addition, subtraction, multiplication, and division
- Decimal and negative-number support
- Division-by-zero protection
- Clear invalid-number and invalid-operator messages
- Repeated calculations in one session

## Technology used

- C++
- Standard C++ library only
- g++ compiler
- VS Code
- Git

## Project structure

```text
CalcXv0.1/
├── src/
│   └── main.cpp
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

## Example usage

```text
Enter first number: 2.5
Enter operator (+ - * /): *
Enter second number: 4

Result: 10

Calculate again? (y/n): n
```

## Current limitations

- Only one operation is evaluated at a time.
- The calculator has no calculation history or advanced mathematical functions yet.
- This is a console application; it has no graphical interface.

## Future roadmap

Future versions may grow CalcX into a broader mathematics and engineering computing platform. Possible future work includes scientific functions, expression parsing, calculation history, and an improved interface. These are not part of Day 1.

## Day 1 development note

Day 1 implemented the first working CalcX calculator. The program uses separate `add`, `subtract`, `multiply`, and `divide` functions, validates input, protects against division by zero, and allows repeated calculations.
