export function previewDoc(html: string, css: string, theme: "light" | "dark" | "grid" = "light") {
  const bg =
    theme === "dark" ? "#1c2230" : theme === "grid" ? "#fafafa" : "#fafafa";
  const grid =
    theme === "grid"
      ? `body{background-image:linear-gradient(#d8ddeb 1px,transparent 1px),linear-gradient(90deg,#d8ddeb 1px,transparent 1px);background-size:16px 16px;}`
      : "";
  const color = theme === "dark" ? "#e8ecf4" : "#1c2230";
  return `<!doctype html>
<html>
<head>
  <meta charset="utf-8" />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Poppins:wght@400;700&display=swap" rel="stylesheet" />
  <style>
    html, body { margin: 0; background: ${bg}; color: ${color}; font-family: Inter, system-ui, sans-serif; }
    body { padding: 20px; min-height: 100%; }
    img { max-width: 100%; }
    ${grid}
    ${css}
  </style>
</head>
<body>${html}</body>
</html>`;
}

export function pascal(name: string) {
  return name.replace(/[^a-zA-Z0-9]+/g, " ").trim().split(" ").map((w) => w[0].toUpperCase() + w.slice(1)).join("");
}

export function toReact(name: string, html: string) {
  const jsx = html.replace(/\bclass=/g, "className=").replace(/\bfor=/g, "htmlFor=");
  return `export function ${pascal(name)}() {
  return (
    <>
${jsx}
    </>
  );
}
`;
}

export function classList(html: string) {
  const names = [...html.matchAll(/class="([^"]+)"/g)].flatMap((m) => m[1].split(/\s+/));
  return [...new Set(names.filter(Boolean))].join("\n");
}
