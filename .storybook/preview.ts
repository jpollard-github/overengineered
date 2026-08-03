import type { Preview } from "@storybook/react";
import "../packages/design-tokens/src/tokens.css";
import "../apps/web/app/globals.css";
const preview: Preview = { parameters: { a11y: { test: "error" }, layout: "padded" } };
export default preview;
