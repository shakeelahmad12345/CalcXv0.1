const ANGLE_MODES = { DEG: "deg", RAD: "rad" };
const constants = { pi: Math.PI, e: Math.E };

function factorial(number) {
  if (!Number.isInteger(number)) return "Factorial requires a whole number.";
  if (number < 0) return "Factorial requires a non-negative integer.";
  if (number > 170) return "Factorial supports values from 0 to 170.";
  let result = 1;
  for (let current = 2; current <= number; current += 1) result *= current;
  return result;
}

function tidy(value) {
  if (Math.abs(value) < 1e-12) return 0;
  const rounded = Math.round(value);
  return Math.abs(value - rounded) < 1e-12 ? rounded : value;
}

function radians(value, mode) { return mode === ANGLE_MODES.DEG ? value * Math.PI / 180 : value; }
function angle(value, mode) { return mode === ANGLE_MODES.DEG ? value * 180 / Math.PI : value; }

function scientific(name, value, mode) {
  switch (name) {
    case "sin": return tidy(Math.sin(radians(value, mode)));
    case "cos": return tidy(Math.cos(radians(value, mode)));
    case "tan": {
      const input = radians(value, mode);
      return Math.abs(Math.cos(input)) < 1e-12 ? "Tangent is undefined at this angle." : tidy(Math.tan(input));
    }
    case "asin": return value < -1 || value > 1 ? "Inverse sine requires a value from -1 to 1." : tidy(angle(Math.asin(value), mode));
    case "acos": return value < -1 || value > 1 ? "Inverse cosine requires a value from -1 to 1." : tidy(angle(Math.acos(value), mode));
    case "atan": return tidy(angle(Math.atan(value), mode));
    case "log": return value <= 0 ? "Logarithm requires a positive number." : Math.log10(value);
    case "ln": return value <= 0 ? "Natural logarithm requires a positive number." : Math.log(value);
    case "exp": return Math.exp(value);
    default: return constants[name];
  }
}

const operations = {
  add: ["Addition", "Add two numbers together.", ["First number", "Second number"]], subtract: ["Subtraction", "Subtract the second number from the first.", ["First number", "Second number"]], multiply: ["Multiplication", "Multiply two numbers.", ["First number", "Second number"]], divide: ["Division", "Divide the first number by the second. Zero is not allowed as a divisor.", ["Dividend", "Divisor"]],
  modulus: ["Modulus", "Find the remainder of two whole numbers.", ["Whole number", "Divisor"]], power: ["Power", "Raise a base to an exponent.", ["Base", "Exponent"]], sqrt: ["Square root", "Find the non-negative square root of a number.", ["Number", ""], true], cbrt: ["Cube root", "Find the real cube root of a number.", ["Number", ""], true], percentage: ["Percentage", "Calculate percentage of a value: percentage × value ÷ 100.", ["Percentage", "Value"]], absolute: ["Absolute value", "Find the distance from zero.", ["Number", ""], true], factorial: ["Factorial", "Use a whole number from 0 to 170.", ["Whole number", ""], true],
  sin: ["Sine", "Calculate sine using the selected angle mode.", ["Angle", ""], true, true], cos: ["Cosine", "Calculate cosine using the selected angle mode.", ["Angle", ""], true, true], tan: ["Tangent", "Calculate tangent using the selected angle mode.", ["Angle", ""], true, true], asin: ["Inverse sine", "Calculate inverse sine; output follows the selected angle mode.", ["Value", ""], true, true], acos: ["Inverse cosine", "Calculate inverse cosine; output follows the selected angle mode.", ["Value", ""], true, true], atan: ["Inverse tangent", "Calculate inverse tangent; output follows the selected angle mode.", ["Value", ""], true, true], log: ["Log base 10", "Calculate the base-10 logarithm of a positive number.", ["Number", ""], true, true], ln: ["Natural logarithm", "Calculate the natural logarithm of a positive number.", ["Number", ""], true, true], exp: ["eˣ", "Calculate e raised to the given power.", ["Exponent", ""], true, true], pi: ["π constant", "Use the mathematical constant pi.", ["No input required", ""], true, false, true], e: ["e constant", "Use Euler's number.", ["No input required", ""], true, false, true],
};

function calculateOperation(name, values, mode = ANGLE_MODES.DEG) {
  const definition = operations[name];
  if (!definition) return { error: "Choose a valid operation." };
  if (definition[5]) return { value: constants[name] };
  const numbers = values.map(value => value.trim() === "" ? NaN : Number(value));
  if (numbers.some(value => !Number.isFinite(value))) return { error: "Enter valid numbers", detail: "Use ordinary finite decimal values in every required field." };
  let answer;
  if (definition[4]) answer = scientific(name, numbers[0], mode);
  else if (name === "factorial") answer = factorial(numbers[0]);
  else if (name === "modulus") answer = !Number.isInteger(numbers[0]) || !Number.isInteger(numbers[1]) ? "Modulus requires whole numbers." : numbers[1] === 0 ? "Cannot perform modulus by zero." : numbers[0] % numbers[1];
  else if (name === "divide") answer = numbers[1] === 0 ? "Cannot divide by zero." : numbers[0] / numbers[1];
  else if (name === "sqrt") answer = numbers[0] < 0 ? "Square root requires a non-negative number." : Math.sqrt(numbers[0]);
  else if (name === "cbrt") answer = Math.cbrt(numbers[0]);
  else if (name === "percentage") answer = numbers[0] / 100 * numbers[1];
  else if (name === "absolute") answer = Math.abs(numbers[0]);
  else if (name === "power") answer = numbers[0] ** numbers[1];
  else if (name === "add") answer = numbers[0] + numbers[1];
  else if (name === "subtract") answer = numbers[0] - numbers[1];
  else answer = numbers[0] * numbers[1];
  return typeof answer === "string" || !Number.isFinite(answer) ? { error: typeof answer === "string" ? answer : "This calculation does not produce a finite real number." } : { value: answer };
}

function initializeCalculator() {
  const form = document.querySelector("#calculator-form"), first = document.querySelector("#first-number"), second = document.querySelector("#second-number"), firstLabel = document.querySelector("#first-label"), secondField = document.querySelector("#second-field"), operationName = document.querySelector("#operation-name"), hint = document.querySelector("#operation-hint"), result = document.querySelector("#result");
  let current = "add", mode = ANGLE_MODES.DEG;
  function show(title, detail, error = false) { result.classList.toggle("error", error); result.replaceChildren(Object.assign(document.createElement("span"), { className: "result-label", textContent: error ? "CHECK INPUT" : "RESULT" }), Object.assign(document.createElement("strong"), { textContent: title }), Object.assign(document.createElement("span"), { className: "result-detail", textContent: detail })); }
  function select(name) { current = name; const definition = operations[name]; operationName.textContent = definition[0]; firstLabel.childNodes[0].nodeValue = `${definition[2][0]} `; secondField.hidden = Boolean(definition[3]); second.required = !definition[3]; first.disabled = Boolean(definition[5]); if (!definition[3]) secondField.childNodes[0].nodeValue = `${definition[2][1]} `; hint.textContent = definition[1]; show("Ready when you are", definition[1]); if (!definition[5]) first.focus(); document.querySelectorAll(".operation").forEach(button => button.classList.toggle("active", button.dataset.operation === name)); }
  document.querySelectorAll(".operation").forEach(button => button.addEventListener("click", () => select(button.dataset.operation)));
  form.addEventListener("submit", event => { event.preventDefault(); const definition = operations[current], calculation = calculateOperation(current, definition[3] ? [first.value] : [first.value, second.value], mode); calculation.error ? show(calculation.error, calculation.detail || definition[1], true) : show(new Intl.NumberFormat("en-US", { maximumFractionDigits: 12 }).format(calculation.value), `${definition[0]} completed successfully.`); });
  document.querySelector("#reset-button").addEventListener("click", () => { form.reset(); show("Ready when you are", operations[current][1]); first.focus(); });
  document.querySelectorAll("input[name=angle-mode]").forEach(control => control.addEventListener("change", event => { mode = event.target.value; show("Angle mode updated", mode === ANGLE_MODES.DEG ? "Trigonometric angles use degrees." : "Trigonometric angles use radians."); }));
  select(current);
}

if (typeof document !== "undefined") initializeCalculator();
if (typeof module !== "undefined") module.exports = { ANGLE_MODES, calculateOperation, calculateScientific: scientific, operations };