function calculateFactorial(number) {
  if (!Number.isInteger(number)) return "Factorial requires a whole number.";
  if (number < 0) return "Factorial requires a non-negative integer.";
  if (number > 170) return "Factorial supports values from 0 to 170.";
  let value = 1;
  for (let current = 2; current <= number; current += 1) value *= current;
  return value;
}

const operations = {
  add: { name: "Addition", hint: "Add two numbers together.", labels: ["First number", "Second number"], calculate: (a, b) => a + b },
  subtract: { name: "Subtraction", hint: "Subtract the second number from the first.", labels: ["First number", "Second number"], calculate: (a, b) => a - b },
  multiply: { name: "Multiplication", hint: "Multiply two numbers.", labels: ["First number", "Second number"], calculate: (a, b) => a * b },
  divide: { name: "Division", hint: "Divide the first number by the second. Zero is not allowed as a divisor.", labels: ["Dividend", "Divisor"], calculate: (a, b) => b === 0 ? "Cannot divide by zero." : a / b },
  modulus: { name: "Modulus", hint: "Find the remainder of two whole numbers.", labels: ["Whole number", "Divisor"], calculate: (a, b) => {
    if (!Number.isInteger(a) || !Number.isInteger(b)) return "Modulus requires whole numbers.";
    return b === 0 ? "Cannot perform modulus by zero." : a % b;
  } },
  power: { name: "Power", hint: "Raise a base to an exponent.", labels: ["Base", "Exponent"], calculate: (a, b) => a ** b },
  sqrt: { name: "Square root", hint: "Find the non-negative square root of a number.", labels: ["Number", ""], unary: true, calculate: a => a < 0 ? "Square root requires a non-negative number." : Math.sqrt(a) },
  cbrt: { name: "Cube root", hint: "Find the real cube root of a number.", labels: ["Number", ""], unary: true, calculate: a => Math.cbrt(a) },
  percentage: { name: "Percentage", hint: "Calculate percentage of a value: percentage × value ÷ 100.", labels: ["Percentage", "Value"], calculate: (a, b) => (a / 100) * b },
  absolute: { name: "Absolute value", hint: "Find the distance from zero.", labels: ["Number", ""], unary: true, calculate: a => Math.abs(a) },
  factorial: { name: "Factorial", hint: "Use a whole number from 0 to 170.", labels: ["Whole number", ""], unary: true, calculate: calculateFactorial },
};

function calculateOperation(name, values) {
  const operation = operations[name];
  if (!operation) return { error: "Choose a valid operation." };
  const numbers = values.map(value => value.trim() === "" ? NaN : Number(value));
  if (numbers.some(number => !Number.isFinite(number))) {
    return { error: "Enter valid numbers", detail: "Use ordinary finite decimal values in every required field." };
  }
  const answer = operation.calculate(...numbers);
  if (typeof answer === "string" || !Number.isFinite(answer)) {
    return { error: typeof answer === "string" ? answer : "This calculation does not produce a finite real number." };
  }
  return { value: answer };
}

function formatNumber(value) {
  return new Intl.NumberFormat("en-US", { maximumFractionDigits: 12 }).format(value);
}

function initializeCalculator() {
  const form = document.querySelector("#calculator-form");
  const first = document.querySelector("#first-number");
  const second = document.querySelector("#second-number");
  const firstLabel = document.querySelector("#first-label");
  const secondField = document.querySelector("#second-field");
  const operationName = document.querySelector("#operation-name");
  const hint = document.querySelector("#operation-hint");
  const result = document.querySelector("#result");
  let currentOperation = "add";

  function showResult(title, detail, isError = false) {
    result.classList.toggle("error", isError);
    result.replaceChildren(
      Object.assign(document.createElement("span"), { className: "result-label", textContent: isError ? "CHECK INPUT" : "RESULT" }),
      Object.assign(document.createElement("strong"), { textContent: title }),
      Object.assign(document.createElement("span"), { className: "result-detail", textContent: detail }),
    );
  }

  function selectOperation(name) {
  currentOperation = name;
  const operation = operations[name];
  document.querySelectorAll(".operation").forEach(button => button.classList.toggle("active", button.dataset.operation === name));
  operationName.textContent = operation.name;
  firstLabel.childNodes[0].nodeValue = `${operation.labels[0]} `;
  secondField.hidden = Boolean(operation.unary);
  second.required = !operation.unary;
  if (!operation.unary) secondField.childNodes[0].nodeValue = `${operation.labels[1]} `;
  hint.textContent = operation.hint;
  showResult("Ready when you are", operation.hint);
  first.focus();
}

  document.querySelectorAll(".operation").forEach(button => button.addEventListener("click", () => selectOperation(button.dataset.operation)));
  form.addEventListener("submit", event => {
    event.preventDefault();
    const operation = operations[currentOperation];
    const calculation = calculateOperation(currentOperation, operation.unary ? [first.value] : [first.value, second.value]);
    if (calculation.error) {
      showResult(calculation.error, calculation.detail || operation.hint, true);
      return;
    }
    showResult(formatNumber(calculation.value), `${operation.name} completed successfully.`);
  });
  document.querySelector("#reset-button").addEventListener("click", () => {
    form.reset();
    showResult("Ready when you are", operations[currentOperation].hint);
    first.focus();
  });
  selectOperation(currentOperation);
}

if (typeof document !== "undefined") initializeCalculator();
if (typeof module !== "undefined") module.exports = { calculateFactorial, calculateOperation, operations };
