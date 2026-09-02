(function (global) {
  const widths = [8, 16, 32, 64];
  function parse(value, base) {
    const text = value.trim().replace(/^0x/i, "");
    if (!text || !new RegExp(base === 2 ? "^[01]+$" : base === 8 ? "^[0-7]+$" : base === 10 ? "^[0-9]+$" : "^[0-9a-f]+$", "i").test(text)) throw new Error("Invalid value for the selected base.");
    const result = parseInt(text, base); if (!Number.isSafeInteger(result)) throw new Error("Value is outside the safe integer range."); return result;
  }
  function mask(width) { return width === 64 ? 0xffffffffffffffffn : (1n << BigInt(width)) - 1n; }
  function unsigned(value, width) { return BigInt.asUintN(width, BigInt(value)); }
  function bits(value, width) { return unsigned(value, width).toString(2).padStart(width, "0"); }
  function format(value, base) { return BigInt(value).toString(base).toUpperCase(); }
  function convert(value, base, width) { const number = parse(value, base); return { decimal: number, binary: bits(number, width), octal: format(number, 8), hexadecimal: format(number, 16) }; }
  function bitwise(first, second, operation, width) { const a = unsigned(first, width); const b = unsigned(second, width); const result = operation === "and" ? a & b : operation === "or" ? a | b : a ^ b; return result; }
  function not(value, width) { return mask(width) ^ unsigned(value, width); }
  function shift(value, count, direction, width) { if (!Number.isInteger(count) || count < 0 || count >= width) throw new Error("Shift count must be a whole number within the selected width."); const input = unsigned(value, width); return direction === "left" ? (input << BigInt(count)) & mask(width) : input >> BigInt(count); }
  function manipulate(value, bit, action, width) { if (!Number.isInteger(bit) || bit < 0 || bit >= width) throw new Error("Bit position is outside the selected width."); const flag = 1n << BigInt(bit); const input = unsigned(value, width); if (action === "set") return input | flag; if (action === "clear") return input & ~flag; if (action === "toggle") return input ^ flag; return (input & flag) !== 0n ? 1n : 0n; }
  function twosComplement(value, width) { return bits(BigInt(value), width); }
  function ascii(value, direction) { if (direction === "toChar") { const code = Number(value); if (!Number.isInteger(code) || code < 0 || code > 127) throw new Error("ASCII code must be an integer from 0 to 127."); return String.fromCharCode(code); } if (value.length !== 1 || value.charCodeAt(0) > 127) throw new Error("Enter one standard ASCII character."); return value.charCodeAt(0); }
  global.CalcXProgrammer = { widths, parse, convert, bitwise, not, shift, manipulate, twosComplement, ascii, bits, format };
})(typeof window === "undefined" ? globalThis : window);
