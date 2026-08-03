import { readdirSync } from "node:fs";
import { resolve } from "node:path";
const directories = (path: string) =>
  readdirSync(resolve(path), { withFileTypes: true }).filter((entry) => entry.isDirectory()).length;
const apps = directories("apps");
const packages = directories("packages");
const adrs = readdirSync("docs/adr").filter((name) => name.endsWith(".md")).length;
const workspaces = apps + packages;
console.log(`Project purpose: Deliver practical guidance for building the smallest honest thing.
Workspaces: ${workspaces}
Deployable applications: ${apps}
Packages: ${packages}
ADRs: ${adrs}
User-visible pages: 1
Ratio of user-visible pages to architectural units: 1:${workspaces}
System complexity is within approved parody thresholds.`);
