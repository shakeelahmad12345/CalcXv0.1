#pragma once

#include <vector>

namespace calcx::engineering {

double voltage(double current, double resistance);
double current(double voltage, double resistance);
double resistance(double voltage, double current);
double power(double voltage, double current);
double seriesResistance(const std::vector<double>& resistors);
double parallelResistance(const std::vector<double>& resistors);
double voltageDivider(double inputVoltage, double r1, double r2);
double currentDividerR1(double totalCurrent, double r1, double r2);
double currentDividerR2(double totalCurrent, double r1, double r2);
double ledResistance(double supplyVoltage, double forwardVoltage, double ledCurrent);
double rcTimeConstant(double resistanceValue, double capacitance);
double rlTimeConstant(double inductance, double resistanceValue);
double frequencyFromPeriod(double period);
double periodFromFrequency(double frequencyValue);
double wavelength(double speed, double frequencyValue);
double minimumSamplingFrequency(double maximumSignalFrequency);
double powerDecibels(double ratio);
double voltageDecibels(double ratio);

}
