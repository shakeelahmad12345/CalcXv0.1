# CalcX

AI-Powered Mathematics & Engineering Computing Platform.

## Current Version

`v0.7` - Level 7 / Matrix and Linear Algebra

CalcX is a dependency-free browser calculator preserving scientific, expression, programmer, and engineering modes.

## Features

- Basic and scientific calculations with DEG/RAD modes
- Safe expression tokenizer/parser with precedence, parentheses, unary operators, nested functions, and constants
- Programmer BIN/OCT/DEC/HEX conversion, bitwise operations, shifts, fixed widths, ASCII, and bit manipulation
- Engineering mode with circuit laws, power, resistor networks, dividers, LED design, time constants, waves, sampling, and decibels
- Linear Algebra mode with matrix input, addition, subtraction, multiplication, transpose, determinant, inverse, rank, Gaussian elimination, RREF, linear systems, eigenvalues, and eigenvectors
- Formula and calculation details, validation, responsive layout, and categorized quick search

## Technology and Structure

Plain HTML/CSS/JavaScript browser application with reusable C++ engineering and matrix modules.

```text
CalcXv0.1/
  src/main.cpp
  src/engineering.h, src/engineering.cpp
  src/matrix.h, src/matrix.cpp
  tests/engineering_test.cpp
  tests/matrix_test.cpp
  web/index.html
  web/styles.css
  web/app.js
  web/expression-engine.js
  web/programmer-engine.js
  web/engineering-engine.js
  web/matrix-engine.js
  docs/
```

## Run

Serve the `web` directory with any static HTTP server. The verified preview is `http://localhost:8080/`.

## C++ Build and Tests

```powershell
g++ -std=c++17 -Wall -Wextra -pedantic src/matrix.cpp tests/matrix_test.cpp -o matrix-tests.exe
.\matrix-tests.exe
g++ -std=c++17 -Wall -Wextra -pedantic src/engineering.cpp tests/engineering_test.cpp -o engineering-tests.exe
.\engineering-tests.exe
```

## Matrix Algorithms

Matrix calculations use a reusable Matrix abstraction and tolerance-based Gauss-Jordan row reduction. The same reduction approach supports RREF, rank, inverse, and linear-system analysis. Determinants use pivoted elimination. Eigenvalues are supported for 2x2 matrices and diagonal 3x3 matrices; complex eigenvalues are intentionally not displayed.

## Validation

Matrix dimensions, square-matrix requirements, incompatible multiplication, singular inverse requests, malformed values, inconsistent systems, no-solution systems, and infinitely-many-solution systems return readable inline errors. Floating-point zero checks use a defined tolerance.

## Testing

Browser verification covers previous modes plus matrix operations, rectangular transpose, determinant, inverse, rank, linear systems, eigenvalues, singular matrices, search categories, mode switching, responsive layout, and runtime errors. C++ unit tests are provided in `tests/`.

## Limitations and Roadmap

The C++ console remains the earlier console implementation; v0.7 matrix functionality is browser-facing with a reusable C++ matrix module. Eigenvalue support is intentionally limited to real 2x2 and diagonal 3x3 cases. History, broader symbolic algebra, and a larger formula library remain future work.

- v0.7: Matrix and Linear Algebra (implemented)
- v0.8: Symbolic and expanded linear algebra tools
