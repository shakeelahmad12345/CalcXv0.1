#include "engineering.h"

#include <cmath>
#include <stdexcept>
#include <string>

namespace calcx::engineering {
namespace {
void positive(double value, const char* name) { if (!std::isfinite(value) || value <= 0.0) throw std::invalid_argument(std::string(name) + " must be greater than zero."); }
void nonNegative(double value, const char* name) { if (!std::isfinite(value) || value < 0.0) throw std::invalid_argument(std::string(name) + " cannot be negative."); }
}

double voltage(double i, double r) { positive(i, "Current"); positive(r, "Resistance"); return i * r; }
double current(double v, double r) { nonNegative(v, "Voltage"); positive(r, "Resistance"); return v / r; }
double resistance(double v, double i) { nonNegative(v, "Voltage"); positive(i, "Current"); return v / i; }
double power(double v, double i) { nonNegative(v, "Voltage"); positive(i, "Current"); return v * i; }
double seriesResistance(const std::vector<double>& values) { if (values.empty()) throw std::invalid_argument("At least one resistor is required."); double total = 0.0; for (double value : values) { positive(value, "Resistance"); total += value; } return total; }
double parallelResistance(const std::vector<double>& values) { if (values.size() < 2) throw std::invalid_argument("At least two resistors are required."); double reciprocal = 0.0; for (double value : values) { positive(value, "Resistance"); reciprocal += 1.0 / value; } return 1.0 / reciprocal; }
double voltageDivider(double input, double r1, double r2) { nonNegative(input, "Input voltage"); positive(r1, "R1"); positive(r2, "R2"); return input * r2 / (r1 + r2); }
double currentDividerR1(double total, double r1, double r2) { positive(total, "Total current"); positive(r1, "R1"); positive(r2, "R2"); return total * r2 / (r1 + r2); }
double currentDividerR2(double total, double r1, double r2) { positive(total, "Total current"); positive(r1, "R1"); positive(r2, "R2"); return total * r1 / (r1 + r2); }
double ledResistance(double supply, double forward, double ledCurrent) { nonNegative(supply, "Supply voltage"); nonNegative(forward, "Forward voltage"); positive(ledCurrent, "LED current"); if (forward >= supply) throw std::invalid_argument("Forward voltage must be below supply voltage."); return (supply - forward) / ledCurrent; }
double rcTimeConstant(double r, double c) { positive(r, "Resistance"); positive(c, "Capacitance"); return r * c; }
double rlTimeConstant(double l, double r) { positive(l, "Inductance"); positive(r, "Resistance"); return l / r; }
double frequencyFromPeriod(double period) { positive(period, "Period"); return 1.0 / period; }
double periodFromFrequency(double frequencyValue) { positive(frequencyValue, "Frequency"); return 1.0 / frequencyValue; }
double wavelength(double speed, double frequencyValue) { positive(speed, "Wave speed"); positive(frequencyValue, "Frequency"); return speed / frequencyValue; }
double minimumSamplingFrequency(double maximumSignalFrequency) { positive(maximumSignalFrequency, "Maximum signal frequency"); return 2.0 * maximumSignalFrequency; }
double powerDecibels(double ratio) { positive(ratio, "Power ratio"); return 10.0 * std::log10(ratio); }
double voltageDecibels(double ratio) { positive(ratio, "Voltage ratio"); return 20.0 * std::log10(ratio); }
}
