import path from "node:path";
import { cp, rm, mkdir } from "node:fs/promises";
import { fileURLToPath } from "node:url";

const rootDir = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  "..",
);
const src = path.join(rootDir, "src", "templates");
const dest = path.join(rootDir, "dist", "templates");

await rm(dest, { recursive: true, force: true });
await mkdir(path.dirname(dest), { recursive: true });
await cp(src, dest, { recursive: true });

console.log(`copied templates -> ${dest}`);