(function (global) {
  const functions = {
    sin: (value, mode) => Math.sin(mode === "deg" ? value * Math.PI / 180 : value),
    cos: (value, mode) => Math.cos(mode === "deg" ? value * Math.PI / 180 : value),
    tan: (value, mode) => {
      const radians = mode === "deg" ? value * Math.PI / 180 : value;
      if (Math.abs(Math.cos(radians)) < 1e-12) throw new Error("Tangent is undefined at this angle.");
      return Math.tan(radians);
    },
    asin: (value, mode) => { if (value < -1 || value > 1) throw new Error("Inverse sine requires a value from -1 to 1."); const result = Math.asin(value); return mode === "deg" ? result * 180 / Math.PI : result; },
    acos: (value, mode) => { if (value < -1 || value > 1) throw new Error("Inverse cosine requires a value from -1 to 1."); const result = Math.acos(value); return mode === "deg" ? result * 180 / Math.PI : result; },
    atan: (value, mode) => { const result = Math.atan(value); return mode === "deg" ? result * 180 / Math.PI : result; },
    sqrt: value => { if (value < 0) throw new Error("Square root requires a non-negative number."); return Math.sqrt(value); },
    cbrt: value => Math.cbrt(value),
    abs: value => Math.abs(value),
    log: value => { if (value <= 0) throw new Error("Logarithm requires a positive number."); return Math.log10(value); },
    ln: value => { if (value <= 0) throw new Error("Natural logarithm requires a positive number."); return Math.log(value); },
    exp: value => Math.exp(value),
  };

  function tokenize(source) {
    const tokens = [];
    let index = 0;
    while (index < source.length) {
      const character = source[index];
      if (/\s/.test(character)) { index += 1; continue; }
      if (/[0-9.]/.test(character)) {
        const match = source.slice(index).match(/^(?:\d+(?:\.\d*)?|\.\d+)(?:[eE][+-]?\d+)?/);
        if (!match) throw new Error("Malformed number.");
        const value = Number(match[0]);
        if (!Number.isFinite(value)) throw new Error("Number must be finite.");
        tokens.push({ type: "number", value }); index += match[0].length; continue;
      }
      if (/[a-zA-Z_π]/.test(character)) {
        const match = source.slice(index).match(/^[a-zA-Z_][a-zA-Z_0-9]*|^π/);
        const name = match[0].toLowerCase(); tokens.push({ type: "name", value: name }); index += name.length; continue;
      }
      if ("+-*/%^(),".includes(character)) tokens.push({ type: character, value: character });
      else throw new Error(`Invalid character '${character}'.`);
      index += 1;
    }
    tokens.push({ type: "eof" });
    return tokens;
  }

  function evaluate(source, mode) {
    if (!source.trim()) throw new Error("Enter an expression.");
    const tokens = tokenize(source); let position = 0;
    const peek = () => tokens[position];
    const take = type => { if (type && peek().type !== type) throw new Error(`Expected '${type}'.`); return tokens[position++]; };
    function primary() {
      if (peek().type === "number") return take().value;
      if (peek().type === "name") {
        const name = take().value;
        if (name === "pi" || name === "π") return Math.PI;
        if (name === "e") return Math.E;
        if (!functions[name]) throw new Error(`Unknown function or constant '${name}'.`);
        take("("); const value = expression(); take(")"); return functions[name](value, mode);
      }
      if (peek().type === "(") { take("("); const value = expression(); take(")"); return value; }
      throw new Error("Missing operand.");
    }
    function unary() { if (peek().type === "+") { take(); return unary(); } if (peek().type === "-") { take(); return -unary(); } return primary(); }
    function power() { const left = unary(); return peek().type === "^" ? (take(), Math.pow(left, power())) : left; }
    function term() { let value = power(); while (["*", "/", "%"].includes(peek().type)) { const operator = take().type; const right = power(); if ((operator === "/" || operator === "%") && right === 0) throw new Error(operator === "/" ? "Cannot divide by zero." : "Cannot perform modulus by zero."); value = operator === "*" ? value * right : operator === "/" ? value / right : value % right; } return value; }
    function expression() { let value = term(); while (["+", "-"].includes(peek().type)) { const operator = take().type; const right = term(); value = operator === "+" ? value + right : value - right; } return value; }
    const result = expression(); if (peek().type !== "eof") throw new Error("Unexpected extra operand or token."); if (!Number.isFinite(result)) throw new Error("This expression does not produce a finite real number."); return Math.abs(result) < 1e-12 ? 0 : result;
  }
  global.CalcXExpression = { tokenize, evaluate };
})(typeof window === "undefined" ? globalThis : window);
