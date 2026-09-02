# CalcX Day 7 - Matrix and Linear Algebra

## What Was Implemented

Level 7 adds a dedicated Linear Algebra mode with matrix input, matrix addition and subtraction, multiplication, transpose, determinant, inverse, rank, Gaussian row reduction, RREF, linear-system solving, eigenvalues, and eigenvectors.

## Why It Exists

The matrix mode makes CalcX useful for engineering and mathematical workflows that require reusable matrix operations rather than isolated scalar calculations.

## Matrix Architecture

The browser uses `web/matrix-engine.js` as an independent calculation layer. `app.js` owns UI state and rendering while the engine validates dimensions and executes algorithms. C++ equivalents live in `src/matrix.h` and `src/matrix.cpp` with tests in `tests/matrix_test.cpp`.

## Algorithms

- Addition, subtraction, multiplication, and transpose use dimension-checked matrix operations.
- Determinants use pivoted elimination.
- Inverse, rank, Gaussian elimination, RREF, and linear systems reuse tolerance-based Gauss-Jordan reduction.
- Eigenvalues support real 2x2 matrices and diagonal 3x3 matrices; eigenvectors are normalized for supported 2x2 cases.

## Numerical Precision

Zero checks use `1e-10` in the matrix engine. Results are cleaned for display to six decimal places while calculations retain double precision.

## Error Handling

The UI reports invalid values, dimension mismatches, non-square matrix requests, singular inverse requests, incompatible systems, no solution, infinitely many solutions, and unsupported complex eigenvalues without crashing.

## UI Structure

Linear Algebra is a separate top-level mode. Its sections identify Matrix Basics, Matrix Operations, Matrix Properties, Row Reduction, Linear Systems, Eigenvalues and Eigenvectors, Matrix Tools, and the result/details area. Quick search includes a dedicated Linear Algebra category.

## Testing and Build

Browser tests passed addition, subtraction, multiplication, transpose, determinant, inverse, rank, linear-system solving, eigenvalues, singular handling, search visibility, and mobile overflow. C++ tests are available with:

```powershell
g++ -std=c++17 -Wall -Wextra -pedantic src/matrix.cpp tests/matrix_test.cpp -o matrix-tests.exe
.\matrix-tests.exe
```

## Version

v0.7
