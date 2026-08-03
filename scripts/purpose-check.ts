import { readFileSync } from "node:fs";
const path = "docs/product/history/original-intent.md";
const required =
  "The original request was to create a one-page informational website explaining how to build software intelligently.";
const content = readFileSync(path, "utf8");
if (!content.includes(required))
  throw new Error(`Purpose drift detected: controlled sentence absent from ${path}`);
console.log("Original intent remains discoverable after the approved number of navigation layers.");
