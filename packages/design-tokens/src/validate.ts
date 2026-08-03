import { tokens } from "./index";
const invalid = Object.keys(tokens).filter((name) => !/^[a-z][a-zA-Z]+$/.test(name));
if (invalid.length) throw new Error(`Imperial token naming breach: ${invalid.join(", ")}`);
console.log("Design token nomenclature remains governable.");
