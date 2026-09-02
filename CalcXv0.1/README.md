# CalcX

C++-first Mathematics, Scientific, Engineering, Matrix, Statistics, and Data Analysis Calculator.

## Current Release

`v0.16` - Level 16 Professional GUI

## Professional GUI

The v0.16 browser application adds a dashboard, responsive sidebar navigation, module cards, global search filtering, local history, light/dark theme persistence, keyboard shortcuts, and Copy/Share/Export result actions. Existing calculator engines remain the source of truth and the Graphing and AI cards clearly identify future modules.

## Existing Calculator Modules

- Scientific expressions and DEG/RAD trigonometry
- Programmer BIN/OCT/DEC/HEX conversion and bit operations
- Engineering formulas with units and calculation breakdowns
- Matrix and Linear Algebra operations
- Statistics and Data Analysis with datasets, regression, and charts

## Technology

The repository is a dependency-free static HTML/CSS/JavaScript frontend with reusable C++ calculation modules and tests. No package manager, backend, database, or API existed in the inspected repository.

## Run

Serve `web/` with any static HTTP server. The verified preview is:

```text
http://localhost:8080/
```

The app also works when opening `web/index.html` directly in a modern browser.

## Local Features

- Dashboard and sidebar navigation
- Global search with module filtering
- Ctrl/Cmd+K focuses search; Ctrl/Cmd+H opens local history; Escape closes history
- Light/dark theme persisted locally
- Up to 50 local history records
- Copy, Web Share with clipboard fallback, and TXT export

## Cloud and Accounts Status

Level 18 is not implemented. There is no Python runtime, FastAPI application, PostgreSQL service, Docker installation, or API boundary in this environment. No fake authentication, cloud synchronization, or insecure token storage was added. See [docs/level-18-cloud-accounts.md](docs/level-18-cloud-accounts.md).

## Documentation

- [Professional GUI](docs/level-16-professional-gui.md)
- [Cloud and Accounts status](docs/level-18-cloud-accounts.md)
- [Architecture](docs/architecture.md)

## Roadmap

- v0.16: Professional GUI (implemented)
- v0.18: Cloud and Accounts (blocked pending backend/database environment)
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
