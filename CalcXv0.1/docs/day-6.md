# CalcX Day 6

## Objective

Deliver Level 5, CalcX v0.5 Programmer Calculator.

## Implemented

Programmer mode supports BIN, OCT, DEC, and HEX conversion; AND, OR, XOR, NOT; left/right shifts; 8, 16, 32, and 64-bit widths; ASCII conversion; and set, clear, toggle, and test bit operations.

## Validation

Values are validated against the selected base. Shift counts and bit positions must be whole numbers within the selected width. Bitwise results are masked to the active width, and two's-complement bit strings are represented through fixed-width unsigned masks.

## Testing

Browser tests cover 255 conversions, binary/hex input, bitwise operations, shifts, ASCII, fixed-width NOT, bit manipulation, invalid input, and switching between Expression, Scientific, and Programmer modes. Responsive widths and browser runtime errors were checked.

## Known Limitations

The C++ console remains the v0.2 console implementation. Expression and programmer workflows are browser features; expression history and a full signed-value editor are deferred.

## Version

v0.5

## Next Milestone

CalcX v0.6 — Engineering and formula tools