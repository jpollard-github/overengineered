import { readFileSync } from "node:fs";
const paths = [
  "README.md",
  "docs/README.md",
  "docs/architecture/README.md",
  "docs/operations/README.md",
  "docs/delivery/README.md",
  "docs/product/README.md",
  "docs/governance/README.md",
  "docs/ai/README.md",
];
const invalid = paths.filter((path) => !readFileSync(path, "utf8").includes("\n## Rationale\n"));
if (invalid.length) throw new Error(`Rationale authority absent: ${invalid.join(", ")}`);
console.log(`Rationale governance confirmed across ${paths.length} major documents.`);
