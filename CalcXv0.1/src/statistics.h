#pragma once
#include <cstddef>
#include <string>
#include <vector>
namespace calcx::statistics {
struct Descriptive { std::size_t count; double sum; double minimum; double maximum; double mean; double median; double range; double q1; double q3; double iqr; double populationVariance; double sampleVariance; std::vector<double> modes; };
Descriptive describe(std::vector<double> values);
double percentile(std::vector<double> values, double p);
double probability(double favorable, double total);
double complement(double probabilityValue);
double unionProbability(double a, double b, double intersection);
double conditionalProbability(double intersection, double given);
double permutations(unsigned n, unsigned r);
double combinations(unsigned n, unsigned r);
double correlation(const std::vector<double>& x, const std::vector<double>& y);
struct Regression { double slope; double intercept; double r; double rSquared; double sse; };
Regression regress(const std::vector<double>& x, const std::vector<double>& y);
}
