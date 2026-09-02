#pragma once
#include <cstddef>
#include <vector>
namespace calcx::linear {
class Matrix {
public:
    Matrix(std::size_t rows, std::size_t columns, double value = 0.0);
    double& at(std::size_t row, std::size_t column);
    double at(std::size_t row, std::size_t column) const;
    std::size_t rows() const noexcept;
    std::size_t columns() const noexcept;
private:
    std::size_t rowCount;
    std::size_t columnCount;
    std::vector<double> values;
};
Matrix add(const Matrix& a, const Matrix& b);
Matrix subtract(const Matrix& a, const Matrix& b);
Matrix multiply(const Matrix& a, const Matrix& b);
Matrix transpose(const Matrix& matrix);
double determinant(const Matrix& matrix);
Matrix inverse(const Matrix& matrix);
std::size_t rank(const Matrix& matrix);
Matrix rref(Matrix matrix);
std::vector<double> solve(const Matrix& coefficients, const std::vector<double>& constants);
std::vector<double> eigenvalues2x2(const Matrix& matrix);
}
