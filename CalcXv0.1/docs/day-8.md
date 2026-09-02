# CalcX Day 8 - Statistics and Data Analysis

## Overview

Version v0.8 adds a separate Statistics & Data Analysis workspace while preserving the Expression, Scientific, Programmer, Engineering, and Linear Algebra modes.

## Architecture

The browser statistics layer is isolated in `web/statistics-engine.js`; `app.js` handles form events, result presentation, and chart rendering. A matching reusable C++ API is provided in `src/statistics.h` and `src/statistics.cpp`, with unit coverage in `tests/statistics_test.cpp`.

## Dataset Workspace

A named dataset can be loaded once and reused for descriptive statistics and visualizations. Values may be positive, negative, zero, decimal, or duplicated. Empty, malformed, NaN, and infinite values are rejected.

## Descriptive Statistics

The engine calculates count, sum, minimum, maximum, mean, median, mode, range, Q1, Q2, Q3, IQR, percentiles, population variance/standard deviation, and sample variance/standard deviation. Sample variance requires at least two observations; a one-value dataset still supports population summaries.

Quartiles and percentiles use the same linear interpolation convention: position is `(n - 1) * p / 100`, with interpolation between adjacent sorted observations.

## Probability and Combinatorics

Basic probability, complement, union, conditional probability, permutations, and combinations are validated and calculated without naive factorial overflow. Invalid ranges and zero conditional denominators return readable errors.

## Correlation and Regression

Pearson correlation is clamped only for tiny floating-point excursions and rejects zero-variance datasets. Regression returns slope, intercept, r, R2, SSE, residual standard deviation, prediction, and residual-ready data. Correlation is reported as association and never as causation.

## Visualization

The visualization section calculates histogram bins and five-number box-plot values through the statistics engine, and renders histogram, line, and scatter canvas views in the frontend. Canvas dimensions remain fixed and responsive containers prevent page overflow.

## Validation and Precision

All formulas retain double precision internally. Display rounding is limited to result presentation. An epsilon of `1e-12` protects correlation zero-variance checks. Histogram bins use left-closed intervals, with the final bin closed on both ends.

## Testing

Browser verification passed dataset loading, descriptive values for `1,2,3,4,5`, probability, combinations, perfect correlation, regression prediction, histogram/line/scatter rendering, empty input validation, categorized search, mode navigation, and mobile overflow. C++ unit tests cover core statistics, probability, combinatorics, regression, and zero-variance validation. The installed MSYS2 compiler exits silently before producing executables on this environment.

## Known Limitations

Multiple named datasets, interactive chart hover/zoom, and a fully rendered box-plot graphic are not yet implemented. The browser is the active user-facing application; the C++ statistics module is reusable core code.
