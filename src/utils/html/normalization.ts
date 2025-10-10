export function normalizeClasses(classStr: string) {
  return classStr.replace(/\s+/g, " ").trim();
}

export function normalizeStyles(styleStr: string) {
  if (!styleStr) return "";
  let out = "";
  let inQuote: '"' | "'" | null = null;
  let esc = false;
  let parenDepth = 0;
  let sawContent = false;

  const push = (c: string) => {
    out += c;
    if (!/\s|;/.test(c)) sawContent = true;
  };
  const trimSpacesBefore = () => {
    out = out.replace(/\s+$/, "");
  };

  const n = styleStr.length;
  for (let i = 0; i < n; i++) {
    const c = styleStr[i];

    // Inside a quoted string, copy verbatim with escape handling
    if (inQuote) {
      push(c);
      if (esc) {
        esc = false;
      } else if (c === "\\") {
        esc = true;
      } else if (c === inQuote) {
        inQuote = null;
      }
      continue;
    }

    if (c === '"' || c === "'") {
      inQuote = c as '"' | "'";
      push(c);
      continue;
    }

    // Track parentheses depth
    if (c === "(") {
      parenDepth++;
      push(c);
      continue;
    }
    if (c === ")" && parenDepth > 0) {
      parenDepth--;
      push(c);
      continue;
    }

    // Normalize separators only at top level
    if (parenDepth === 0 && c === ":") {
      trimSpacesBefore();
      push(": ");
      // skip any spaces after ':'
      while (i + 1 < n && /\s/.test(styleStr[i + 1])) i++;
      continue;
    }

    if (parenDepth === 0 && c === ";") {
      // If nothing meaningful emitted yet, drop leading semicolons entirely
      if (!sawContent) {
        // skip subsequent semicolons and spaces
        while (i + 1 < n && (styleStr[i + 1] === ";" || /\s/.test(styleStr[i + 1]))) i++;
        continue;
      }

      trimSpacesBefore();
      push(";");
      while (i + 1 < n && (styleStr[i + 1] === ";" || /\s/.test(styleStr[i + 1]))) i++;
      continue;
    }

    push(c);
  }

  out = out.trim();

  if (out) {
    out = out.replace(/[\s;]+$/, "");
    out += ";";
  }

  return out;
}
