# CalcX Day 3

## Objective

Complete and stabilize Advanced Calculator v0.2.

## Implemented Features

- All eleven visible operations work in the browser and console applications.
- Addition, subtraction, multiplication, division, modulus, power, square root, cube root, percentage, absolute value, and factorial are supported.
- Modulus requires whole-number operands and rejects a zero divisor.
- Factorial supports non-negative whole numbers from 0 to 170, including `0! = 1`.
- Percentage uses `percentage × value ÷ 100`.
- Clear resets input values, result messaging, and temporary form state without reloading the page.
- Operation switching updates labels, hints, visible fields, and calculation behavior.

## Validation

Inputs must be finite numbers. Empty, whitespace-only, malformed, and non-finite values produce inline errors. Division and modulus by zero, negative square roots, non-whole modulus operands, and invalid factorial inputs produce short, readable errors without interrupting the application.

## Testing

- C++ build: `g++ -std=c++17 -Wall -Wextra -pedantic src/main.cpp -o calcx.exe` passed.
- Browser verification covers normal results for all eleven operations, negative cube roots, percentage semantics, factorial boundaries, clear/reset, operation switching, and the required error cases.
- No test framework or JavaScript runtime is installed in the environment; browser checks are the executable UI test path.

## Architecture

The browser separates responsibilities into three layers:

UI event handlers read fields and update the existing result panel. `calculateOperation` validates operation names and finite numeric input before invoking the selected operation. The operation table contains the reusable mathematical rules and returns either a numeric result or a human-readable error.

## Known Limitations

- One operation is evaluated at a time; expression parsing and calculation history are not available.
- The browser application is a standalone static frontend and does not call the C++ implementation.
- Scientific functions are intentionally deferred to v0.3.

## Version

v0.2

## Next Step

Level 3 — Scientific Calculator / v0.3