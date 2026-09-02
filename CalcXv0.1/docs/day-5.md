# CalcX Day 5

## Objective

Deliver Level 4, CalcX v0.4 Expression Engine.

## Implementation

The browser now accepts complete expressions and evaluates them through a tokenizer and recursive-descent parser. It supports decimal numbers, constants, unary signs, nested parentheses, nested function calls, precedence, right-associative power, and safe finite-result validation.

## Architecture

`expression-engine.js` separates tokenization, parsing, and evaluation from the UI. The parser consumes a token stream and its call stack represents the expression tree: primary values/functions, unary operators, power, multiplicative operators, and additive operators. This preserves precedence without `eval()` or arbitrary code execution.

## Validation and Testing

Tested precedence, nested parentheses/functions, constants, DEG/RAD trigonometry, malformed expressions, unknown functions, missing operands, division/modulus by zero, and scientific domain errors. v0.3 operations remain available through the expression language.

## Version

v0.4

## Next Milestone

CalcX v0.5 — Programmer Calculator