#include <cmath>
#include <iostream>
#include <limits>
#include <string>

double add(double a, double b) { return a + b; }
double subtract(double a, double b) { return a - b; }
double multiply(double a, double b) { return a * b; }

bool divide(double a, double b, double& result) {
    if (b == 0.0) return false;
    result = a / b;
    return true;
}

bool modulus(double a, double b, double& result) {
    if (b == 0.0 || std::floor(a) != a || std::floor(b) != b) return false;
    result = std::fmod(a, b);
    return true;
}

bool power(double base, double exponent, double& result) {
    result = std::pow(base, exponent);
    return std::isfinite(result);
}

bool squareRoot(double number, double& result) {
    if (number < 0.0) return false;
    result = std::sqrt(number);
    return true;
}

double cubeRoot(double number) { return std::cbrt(number); }
double percentageOf(double percentage, double number) { return (percentage / 100.0) * number; }
double absoluteValue(double number) { return std::fabs(number); }

bool factorial(double number, double& result) {
    constexpr int maximumInput = 170;
    if (number < 0.0 || std::floor(number) != number || number > maximumInput) return false;

    result = 1.0;
    for (int value = 2; value <= static_cast<int>(number); ++value) result *= value;
    return true;
}

double readNumber(const std::string& prompt) {
    double number;
    while (true) {
        std::cout << prompt;
        if (std::cin >> number && std::isfinite(number)) return number;
        std::cout << "Invalid number. Please enter a finite decimal number.\n";
        std::cin.clear();
        std::cin.ignore(std::numeric_limits<std::streamsize>::max(), '\n');
    }
}

void showMenu() {
    std::cout << "\nChoose an operation:\n"
              << "  + Add       - Subtract    * Multiply    / Divide\n"
              << "  % Modulus   ^ Power       s Square root c Cube root\n"
              << "  p Percentage of           a Absolute value\n"
              << "  f Factorial r Reset       q Quit\n";
}

char readOperation() {
    const std::string validOperations = "+-*/%^scpafrq";
    std::string operation;
    while (true) {
        std::cout << "Select operation: ";
        if (std::cin >> operation && operation.size() == 1 &&
            validOperations.find(operation[0]) != std::string::npos) return operation[0];
        std::cout << "Invalid operation. Please select one option from the menu.\n";
        std::cin.clear();
        std::cin.ignore(std::numeric_limits<std::streamsize>::max(), '\n');
    }
}

bool calculateAgain() {
    char answer;
    while (true) {
        std::cout << "Calculate again? (y/n): ";
        if (std::cin >> answer) {
            if (answer == 'y' || answer == 'Y') return true;
            if (answer == 'n' || answer == 'N') return false;
        }
        std::cout << "Invalid choice. Please enter y or n.\n";
        std::cin.clear();
        std::cin.ignore(std::numeric_limits<std::streamsize>::max(), '\n');
    }
}

int main() {
    std::cout << "========================================\n"
              << "      CALCX v0.2 ADVANCED CALCULATOR\n"
              << "========================================\n";

    bool keepCalculating = true;
    while (keepCalculating) {
        showMenu();
        const char operation = readOperation();
        if (operation == 'q') break;
        if (operation == 'r') {
            std::cout << "Calculator reset. Choose a new operation.\n";
            continue;
        }

        double result = 0.0;
        bool succeeded = true;
        std::string error;

        switch (operation) {
            case '+': { double a = readNumber("Enter first number: "); double b = readNumber("Enter second number: "); result = add(a, b); break; }
            case '-': { double a = readNumber("Enter first number: "); double b = readNumber("Enter second number: "); result = subtract(a, b); break; }
            case '*': { double a = readNumber("Enter first number: "); double b = readNumber("Enter second number: "); result = multiply(a, b); break; }
            case '/': { double a = readNumber("Enter dividend: "); double b = readNumber("Enter divisor: "); succeeded = divide(a, b, result); error = "Cannot divide by zero."; break; }
            case '%': { double a = readNumber("Enter first number: "); double b = readNumber("Enter second number: "); succeeded = modulus(a, b, result); error = b == 0.0 ? "Cannot perform modulus by zero." : "Modulus requires whole numbers."; break; }
            case '^': { double a = readNumber("Enter base: "); double b = readNumber("Enter exponent: "); succeeded = power(a, b, result); error = "This power calculation does not produce a finite real number."; break; }
            case 's': { double a = readNumber("Enter number: "); succeeded = squareRoot(a, result); error = "Square root requires a non-negative number."; break; }
            case 'c': result = cubeRoot(readNumber("Enter number: ")); break;
            case 'p': { double a = readNumber("Enter percentage: "); double b = readNumber("Enter number: "); result = percentageOf(a, b); break; }
            case 'a': result = absoluteValue(readNumber("Enter number: ")); break;
            case 'f': { double a = readNumber("Enter a whole number (0 to 170): "); succeeded = factorial(a, result); error = a < 0.0 ? "Factorial requires a non-negative integer." : std::floor(a) != a ? "Factorial requires a whole number." : "Factorial supports values from 0 to 170."; break; }
        }

        if (succeeded) std::cout << "\nResult: " << result << "\n\n";
        else std::cout << "\nError: " << error << "\n\n";
        keepCalculating = calculateAgain();
    }

    std::cout << "\n========================================\nThank you for using CalcX.\n========================================\n";
    return 0;
}
