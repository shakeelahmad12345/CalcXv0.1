#include "../src/engineering.h"

#include <cassert>
#include <cmath>
#include <iostream>

bool close(double actual, double expected) { return std::abs(actual - expected) < 1e-9; }

int main() {
    using namespace calcx::engineering;
    assert(close(current(12.0, 6.0), 2.0));
    assert(close(power(12.0, 2.0), 24.0));
    assert(close(seriesResistance({100.0, 220.0, 330.0}), 650.0));
    assert(close(parallelResistance({100.0, 100.0}), 50.0));
    assert(close(voltageDivider(12.0, 1000.0, 1000.0), 6.0));
    assert(close(currentDividerR1(2.0, 1000.0, 1000.0), 1.0));
    assert(close(ledResistance(5.0, 2.0, 0.02), 150.0));
    assert(close(rcTimeConstant(1000.0, 0.001), 1.0));
    assert(close(rlTimeConstant(1.0, 1.0), 1.0));
    assert(close(frequencyFromPeriod(0.001), 1000.0));
    assert(close(wavelength(343.0, 1000.0), 0.343));
    assert(close(minimumSamplingFrequency(20000.0), 40000.0));
    assert(close(powerDecibels(10.0), 10.0));
    assert(close(voltageDecibels(10.0), 20.0));
    bool rejected = false;
    try { parallelResistance({100.0}); } catch (...) { rejected = true; }
    assert(rejected);
    std::cout << "engineering tests: PASS\n";
}
