# CalcX

AI-Powered Mathematics, Scientific, Engineering and Data Analysis Calculator.

## Current Version

`v0.8` - Level 8 / Statistics and Data Analysis

## Features

- Scientific expressions and DEG/RAD trigonometry
- Programmer base conversion and bit operations
- Engineering formulas with SI units and calculation breakdowns
- Matrix and Linear Algebra operations
- Statistics & Data Analysis with reusable datasets, descriptive statistics, probability, combinatorics, correlation, regression, and charts

## Statistics

The v0.8 workspace calculates count, sum, min/max, mean, median, mode, range, quartiles, IQR, percentiles, population/sample variance and standard deviation, probability operations, permutations, combinations, Pearson correlation, least-squares regression, predictions, residual metrics, histogram bins, box-plot values, scatter plots, and line charts.

Quartiles and percentiles use linear interpolation at position `(n - 1) * p / 100`. Population variance divides by `N`; sample variance divides by `n - 1`. Calculations retain double precision and use a `1e-12` tolerance for correlation safeguards.

## Structure

```text
CalcXv0.1/
  src/statistics.h, src/statistics.cpp
  tests/statistics_test.cpp
  web/statistics-engine.js
  web/index.html, web/app.js, web/styles.css
  docs/day-8.md
```

## Run

Serve the `web` directory with a static HTTP server. The verified preview is `http://localhost:8080/`.

## C++ Tests

```powershell
g++ -std=c++17 -Wall -Wextra -pedantic src/statistics.cpp src/statistics_test.cpp -o statistics-tests.exe
.\statistics-tests.exe
```

The browser test path verifies all Level 8 workflows and regression navigation for Levels 3-7. See `docs/day-8.md` for conventions and limitations.

## Roadmap

- v0.8: Statistics and Data Analysis (implemented)
- v0.9: Expanded data tools and formula libraries
