(function () {
  const $ = selector => document.querySelector(selector);
  const result = $("#result");
  const input = $("#expression-input");
  const state = { angle: "deg", base: 10, width: 8 };
  const show = (title, detail, error = false) => { result.classList.toggle("error", error); result.replaceChildren(Object.assign(document.createElement("span"), { className: "result-label", textContent: error ? "CHECK INPUT" : "RESULT" }), Object.assign(document.createElement("strong"), { textContent: title }), Object.assign(document.createElement("span"), { className: "result-detail", textContent: detail })); };
  const format = value => new Intl.NumberFormat("en-US", { maximumFractionDigits: 12 }).format(value);
  const setMode = name => { document.querySelectorAll(".mode-tab").forEach(tab => tab.classList.toggle("active", tab.dataset.mode === name)); document.querySelectorAll(".mode-panel").forEach(panel => { panel.hidden = panel.id !== `${name}-panel`; }); };
  const evaluate = () => { try { show(format(CalcXExpression.evaluate(input.value, state.angle)), "Expression evaluated successfully."); } catch (error) { show(error.message, "Check the expression and try again.", true); } };
  document.querySelectorAll(".mode-tab").forEach(tab => tab.addEventListener("click", () => setMode(tab.dataset.mode)));
  document.querySelectorAll("input[name=angle-mode]").forEach(control => control.addEventListener("change", event => { state.angle = event.target.value; show("Angle mode updated", state.angle === "deg" ? "Trigonometric functions use degrees." : "Trigonometric functions use radians."); }));
  $("#expression-form").addEventListener("submit", event => { event.preventDefault(); evaluate(); });
  $("#expression-clear").addEventListener("click", () => { input.value = ""; show("Ready when you are", "Enter an expression to begin."); input.focus(); });
  document.querySelectorAll("[data-expression]").forEach(button => button.addEventListener("click", () => { input.value = button.dataset.expression; evaluate(); }));
  input.addEventListener("keydown", event => { if (event.key === "Escape") $("#expression-clear").click(); });
  const programmerInput = $("#programmer-input"), programmerOther = $("#programmer-other"), programmerResult = $("#programmer-result");
  const programmerError = message => { programmerResult.classList.add("error"); programmerResult.textContent = message; };
  const renderProgrammer = values => { programmerResult.classList.remove("error"); programmerResult.replaceChildren(Object.assign(document.createElement("strong"), { textContent: `DEC ${values.decimal}` }), Object.assign(document.createElement("span"), { textContent: `BIN ${values.binary}` }), Object.assign(document.createElement("span"), { textContent: `OCT ${values.octal}` }), Object.assign(document.createElement("span"), { textContent: `HEX ${values.hexadecimal}` })); };
  const read = () => CalcXProgrammer.parse(programmerInput.value, state.base);
  const refresh = () => { try { renderProgrammer(CalcXProgrammer.convert(programmerInput.value, state.base, state.width)); } catch (error) { programmerError(error.message); } };
  document.querySelectorAll("[data-base]").forEach(button => button.addEventListener("click", () => { state.base = Number(button.dataset.base); document.querySelectorAll("[data-base]").forEach(item => item.classList.toggle("active", item === button)); refresh(); }));
  document.querySelectorAll("[data-width]").forEach(button => button.addEventListener("click", () => { state.width = Number(button.dataset.width); document.querySelectorAll("[data-width]").forEach(item => item.classList.toggle("active", item === button)); refresh(); }));
  $("#programmer-form").addEventListener("submit", event => { event.preventDefault(); refresh(); });
  document.querySelectorAll("[data-bit-op]").forEach(button => button.addEventListener("click", () => { try { programmerInput.value = CalcXProgrammer.format(CalcXProgrammer.bitwise(read(), CalcXProgrammer.parse(programmerOther.value, state.base), button.dataset.bitOp, state.width), state.base); refresh(); } catch (error) { programmerError(error.message); } }));
  document.querySelectorAll("[data-shift]").forEach(button => button.addEventListener("click", () => { try { programmerInput.value = CalcXProgrammer.format(CalcXProgrammer.shift(read(), Number($("#shift-count").value), button.dataset.shift, state.width), state.base); refresh(); } catch (error) { programmerError(error.message); } }));
  $("#not-button").addEventListener("click", () => { try { programmerInput.value = CalcXProgrammer.format(CalcXProgrammer.not(read(), state.width), state.base); refresh(); } catch (error) { programmerError(error.message); } });
  document.querySelectorAll("[data-bit-action]").forEach(button => button.addEventListener("click", () => { try { programmerInput.value = CalcXProgrammer.format(CalcXProgrammer.manipulate(read(), Number($("#bit-position").value), button.dataset.bitAction, state.width), state.base); refresh(); } catch (error) { programmerError(error.message); } }));
  $("#ascii-button").addEventListener("click", () => { try { const value = programmerInput.value.trim(); programmerResult.classList.remove("error"); programmerResult.textContent = /^\d+$/.test(value) ? `Character ${String.fromCharCode(Number(value))}` : `ASCII ${CalcXProgrammer.ascii(value, "toCode")}`; } catch (error) { programmerError(error.message); } });
  $("#programmer-clear").addEventListener("click", () => { programmerInput.value = "0"; refresh(); });
  const engineeringResult = $("#engineering-result");
  function showEngineering(calculation) {
    const values = calculation.value != null ? `${CalcXEngineering.format(calculation.value, calculation.unit)}` : `I1 = ${CalcXEngineering.format(calculation.value1, calculation.unit)}; I2 = ${CalcXEngineering.format(calculation.value2, calculation.unit)}`;
    engineeringResult.classList.remove("error");
    engineeringResult.innerHTML = `<strong>${values}</strong><span>Formula: ${calculation.formula || "Result"}</span><span>Calculation: ${calculation.calculation || "Completed successfully."}</span>${calculation.warning ? `<span>${calculation.warning}</span>` : ""}`;
  }
  function field(form, name) { return form.elements[name].value; }
  document.querySelectorAll(".engineering-form").forEach(form => form.addEventListener("submit", event => {
    event.preventDefault();
    try {
      const type = form.dataset.engineering;
      let calculation;
      if (type === "ohm") calculation = CalcXEngineering.ohmsLaw(field(form, "unknown"), field(form, "unknown") === "voltage" ? null : field(form, "voltage"), field(form, "unknown") === "current" ? null : field(form, "current"), field(form, "unknown") === "resistance" ? null : field(form, "resistance"));
      if (type === "power") calculation = CalcXEngineering.power("power", field(form, "voltage"), field(form, "current"), null);
      if (type === "network") calculation = { value: field(form, "network") === "series" ? CalcXEngineering.series(field(form, "values").split(",")) : CalcXEngineering.parallel(field(form, "values").split(",")), formula: field(form, "network") === "series" ? "Rtotal = R1 + R2 + ..." : "1/Rtotal = Σ(1/R)", calculation: field(form, "values"), unit: "Ω" };
      if (type === "divider") calculation = field(form, "divider") === "voltage" ? CalcXEngineering.voltageDivider(field(form, "input"), field(form, "r1"), field(form, "r2")) : CalcXEngineering.currentDivider(field(form, "input"), field(form, "r1"), field(form, "r2"));
      if (type === "led") calculation = CalcXEngineering.led(field(form, "supply"), field(form, "forward"), field(form, "current"), Number(field(form, "rating")));
      if (type === "time") calculation = field(form, "timeType") === "rc" ? CalcXEngineering.rc(field(form, "resistance"), field(form, "capacitance")) : CalcXEngineering.rl(field(form, "inductance"), field(form, "resistance"));
      if (type === "waves") calculation = field(form, "waveType") === "frequency" ? CalcXEngineering.frequency("frequency", field(form, "a")) : field(form, "waveType") === "period" ? CalcXEngineering.frequency("period", field(form, "a")) : CalcXEngineering.wavelength("wavelength", field(form, "b"), field(form, "a"));
      if (type === "sampling") calculation = CalcXEngineering.sampling(field(form, "frequency"));
      if (type === "db") calculation = CalcXEngineering.decibels(field(form, "dbType"), field(form, "ratio"));
      showEngineering(calculation);
    } catch (error) { engineeringResult.classList.add("error"); engineeringResult.textContent = error.message; }
  }));
  const quickSearch = $("#quick-search-input"), quickMenu = $("#quick-search-menu"), linearMenu = $("#quick-linear-menu");
  quickSearch.addEventListener("focus", () => { quickMenu.hidden = false; linearMenu.hidden = false; });
  quickSearch.addEventListener("input", () => { const query = quickSearch.value.toLowerCase(); quickMenu.querySelectorAll("button").forEach(button => { button.hidden = query && !button.textContent.toLowerCase().includes(query); }); });
  quickMenu.querySelectorAll("[data-quick]").forEach(button => button.addEventListener("click", () => { setMode("expression"); input.value += button.dataset.quick; input.focus(); quickMenu.hidden = true; }));
  quickMenu.querySelectorAll("[data-quick-mode]").forEach(button => button.addEventListener("click", () => { setMode(button.dataset.quickMode); quickMenu.hidden = true; }));
  linearMenu.querySelectorAll("[data-quick-mode]").forEach(button => button.addEventListener("click", () => { setMode(button.dataset.quickMode); linearMenu.hidden = true; quickMenu.hidden = true; }));
  const matrixResult = $("#matrix-result");
  const parseMatrix = value => value.split(";").map(row => row.split(",").map(Number));
  const matrixText = matrix => matrix.map(row => `[ ${row.map(value => Number(value.toFixed(6))).join("  ")} ]`).join("\n");
  $("#matrix-calculate").addEventListener("click", () => {
    try {
      const operation = $("#matrix-operation").value, a = parseMatrix($("#matrix-a").value), b = parseMatrix($("#matrix-b").value), vector = parseMatrix($("#matrix-vector").value);
      let value, formula = "";
      if (operation === "add") { value = CalcXMatrix.add(a, b); formula = "A + B"; }
      if (operation === "subtract") { value = CalcXMatrix.subtract(a, b); formula = "A - B"; }
      if (operation === "multiply") { value = CalcXMatrix.multiply(a, b); formula = "Cij = Σ Aik Bkj"; }
      if (operation === "transpose") { value = CalcXMatrix.transpose(a); formula = "Aᵀ"; }
      if (operation === "determinant") { value = CalcXMatrix.determinant(a); formula = "det(A)"; }
      if (operation === "inverse") { value = CalcXMatrix.inverse(a); formula = "A⁻¹ by Gauss-Jordan elimination"; }
      if (operation === "rank") { value = CalcXMatrix.rank(a); formula = "rank(A) by row reduction"; }
      if (operation === "echelon" || operation === "rref") { const reduction = CalcXMatrix.echelon(a, operation === "rref"); value = reduction.matrix; formula = `${operation === "rref" ? "RREF" : "Row echelon form"}; Steps: ${reduction.steps.join("; ") || "none"}`; }
      if (operation === "solve") { const solution = CalcXMatrix.solve(a, vector); value = solution.values ? solution.values.map((item, index) => [`x${index + 1}`, item]) : solution.state; formula = "Ax = b by Gauss-Jordan elimination"; }
      if (operation === "eigenvalues") { value = CalcXMatrix.eigen(a); formula = "det(A - λI) = 0"; }
      if (operation === "eigenvectors") { const values = CalcXMatrix.eigen(a); value = CalcXMatrix.eigenvectors(a, values); formula = "(A - λI)v = 0"; }
      const display = Array.isArray(value) && Array.isArray(value[0]) && typeof value[0][0] === "number" ? matrixText(value) : Array.isArray(value) ? value.map(item => Array.isArray(item) ? `${item[0]} = ${item[1]}` : `λ = ${Number(item.toFixed(6))}`).join("\n") : String(value);
      matrixResult.classList.remove("error"); matrixResult.replaceChildren(Object.assign(document.createElement("strong"), { textContent: display }), Object.assign(document.createElement("span"), { textContent: `Formula: ${formula}` }), Object.assign(document.createElement("span"), { textContent: `Dimensions: ${Array.isArray(value) && Array.isArray(value[0]) ? `${value.length} × ${value[0].length}` : "scalar/result"}` }));
    } catch (error) { matrixResult.classList.add("error"); matrixResult.textContent = error.message; }
  });
  $("#matrix-clear").addEventListener("click", () => { $("#matrix-a").value = ""; $("#matrix-b").value = ""; $("#matrix-vector").value = ""; matrixResult.textContent = "Choose a matrix operation."; });
  quickMenu.querySelectorAll("button").forEach(button => { if (/Determinant|Linear Systems|Eigenvalues/.test(button.textContent)) button.addEventListener("click", () => { setMode("linear-algebra"); $("#matrix-operation").value = button.textContent.toLowerCase().replace(" ", ""); quickMenu.hidden = true; }); });
  setMode("expression"); refresh(); input.focus();
})();
