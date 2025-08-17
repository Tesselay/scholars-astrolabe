import { visit } from "unist-util-visit";

// Matches: [!note], [!warning] Title..., optionally with +/- for collapsed state
const CALLOUT = /^\s*\[!([a-z-]+)\](?:\s*([+-]))?\s*(.*)$/i;

const TYPE_ALIASES = {
  info: "note",
  abstract: "info",
  summary: "info",
  tldr: "info",
  bug: "error",
  failure: "error",
  danger: "error",
  success: "check",
  tip: "tip",
  todo: "todo",
  warning: "warning",
  caution: "warning",
};

function capitalize(s) {
  return s ? s.charAt(0).toUpperCase() + s.slice(1) : s;
}

export default function remarkCallouts() {
  return (tree) => {
    visit(tree, "blockquote", (node) => {
      const first = node.children && node.children[0];
      if (
        !first ||
        first.type !== "paragraph" ||
        !first.children ||
        !first.children.length
      )
        return;

      // Build a raw string from the first paragraph's inline nodes
      const raw = first.children
        .map((c) =>
          c.type === "text" ? c.value : c.children?.[0]?.value || "",
        )
        .join("");

      const m = raw && raw.match(CALLOUT);
      if (!m) return;

      const rawType = m[1].toLowerCase();
      const collapse = m[2]; // '-' collapsed, '+' expanded
      const titleRaw = (m[3] || "").trim();

      const type = TYPE_ALIASES[rawType] || rawType;
      const title = titleRaw || capitalize(type);

      // Remove the marker from ONLY the first text node
      const firstInline = first.children[0];
      if (firstInline && firstInline.type === "text") {
        firstInline.value = firstInline.value
          .replace(CALLOUT, "")
          .replace(/^\s+/, "");
      }

      // Tell remark-rehype to output <aside ...>...</aside>
      node.data ||= {};
      node.data.hName = "aside";
      node.data.hProperties = {
        className: ["callout", type],
        "data-callout": type,
        "data-title": title,
        ...(collapse && {
          "data-collapsible": "true",
          "data-collapsed": collapse === "-" ? "true" : "false",
        }),
      };
    });
  };
}
