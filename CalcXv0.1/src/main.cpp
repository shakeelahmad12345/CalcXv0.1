#include <iostream>
#include <limits>

double add(double firstNumber, double secondNumber) {
    return firstNumber + secondNumber;
}

double subtract(double firstNumber, double secondNumber) {
    return firstNumber - secondNumber;
}

double multiply(double firstNumber, double secondNumber) {
    return firstNumber * secondNumber;
}

bool divide(double firstNumber, double secondNumber, double& result) {
    if (secondNumber == 0.0) {
        return false;
    }

    result = firstNumber / secondNumber;
    return true;
}

double readNumber(const char* prompt) {
    double number;

    while (true) {
        std::cout << prompt;

        if (std::cin >> number) {
            return number;
        }

        std::cout << "Invalid number. Please enter a valid decimal number.\n";
        std::cin.clear();
        std::cin.ignore(std::numeric_limits<std::streamsize>::max(), '\n');
    }
}

char readOperator() {
    char operation;

    while (true) {
        std::cout << "Enter operator (+ - * /): ";

        if (std::cin >> operation &&
            (operation == '+' || operation == '-' || operation == '*' || operation == '/')) {
            return operation;
        }

        std::cout << "Invalid operator. Please use +, -, *, or /.\n";
        std::cin.clear();
        std::cin.ignore(std::numeric_limits<std::streamsize>::max(), '\n');
    }
}

bool calculateAgain() {
    char answer;

    while (true) {
        std::cout << "Calculate again? (y/n): ";

        if (std::cin >> answer) {
            if (answer == 'y' || answer == 'Y') {
                return true;
            }
            if (answer == 'n' || answer == 'N') {
                return false;
            }
        }

        std::cout << "Invalid choice. Please enter y or n.\n";
        std::cin.clear();
        std::cin.ignore(std::numeric_limits<std::streamsize>::max(), '\n');
    }
}

int main() {
    std::cout << "========================================\n";
    std::cout << "        CALCX v0.1 BASIC CALCULATOR\n";
    std::cout << "========================================\n\n";

    bool keepCalculating = true;

    while (keepCalculating) {
        const double firstNumber = readNumber("Enter first number: ");
        const char operation = readOperator();
        const double secondNumber = readNumber("Enter second number: ");

        double result = 0.0;
        bool calculationSucceeded = true;

        switch (operation) {
            case '+':
                result = add(firstNumber, secondNumber);
                break;
            case '-':
                result = subtract(firstNumber, secondNumber);
                break;
            case '*':
                result = multiply(firstNumber, secondNumber);
                break;
            case '/':
                calculationSucceeded = divide(firstNumber, secondNumber, result);
                break;
        }

        if (calculationSucceeded) {
            std::cout << "\nResult: " << result << "\n\n";
        } else {
            std::cout << "\nError: Cannot divide by zero.\n\n";
        }

        keepCalculating = calculateAgain();
        std::cout << "\n";
    }

    std::cout << "========================================\n";
    std::cout << "Thank you for using CalcX.\n";
    std::cout << "========================================\n";

    return 0;
}
