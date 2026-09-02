# CalcX Day 4

## Objective

Implement and verify CalcX v0.3 Scientific Calculator functionality without regressing v0.2.

## Implementation

The browser app now includes sine, cosine, tangent, inverse sine, inverse cosine, inverse tangent, base-10 logarithm, natural logarithm, e^x, pi, and e. The existing everyday operation controls remain available.

## Scientific Functions

- Forward trig: `sin`, `cos`, `tan`
- Inverse trig: `asin`, `acos`, `atan`
- Logarithms: `log` and `ln`
- Exponential: `e^x`
- Constants: `pi` and `e`

## Degree/Radian Handling

The visible DEG/RAD selector controls all trigonometric operations. Forward inputs are converted to radians internally in DEG mode. Inverse functions return degrees in DEG mode and radians in RAD mode. Tangent rejects angles whose cosine is within `1e-12` of zero.

## Validation

All required inputs must be finite numbers. Inverse sine/cosine enforce the domain `-1 <= x <= 1`; logarithms require positive inputs; exponential overflow, empty input, malformed text, and non-finite values produce inline errors.

## Testing

- Browser tests passed for all scientific functions, pi/e constants, DEG/RAD conversion, tangent singularity, inverse-trig domains, logarithm domains, and exponential output.
- Browser regression tests passed for all v0.2 operations, including division/modulus by zero, negative square root, factorial validation, Clear, and operation switching.
- Responsive browser checks passed at desktop, tablet, and mobile widths with no horizontal overflow.
- The existing C++ v0.2 build remains available and was not replaced.

## Architecture

UI event handlers delegate to `calculateOperation`, which validates finite input and selects either an everyday or scientific calculation. Scientific conversion and domain rules live in `scientific`, while shared result rendering remains in the UI layer.

## Known Limitations

- The scientific implementation is currently in the browser frontend; the C++ console implementation remains v0.2.
- Only one operation is evaluated at a time. Expression parsing and history are deferred.

## Version

v0.3

## Next Milestone

CalcX v0.4 — Expression Engine