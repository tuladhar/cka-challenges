import { cp, mkdir, rm } from "node:fs/promises";
import { resolve } from "node:path";

const root = resolve(import.meta.dirname, "..");
const output = resolve(root, "dist");
const paths = ["index.html", "cka", "achievers", "assets", "data", "404.html", "_headers", "_redirects"];

await rm(output, { recursive: true, force: true });
await mkdir(output, { recursive: true });
await Promise.all(paths.map((path) => cp(resolve(root, path), resolve(output, path), { recursive: true })));
console.log(`Built ${paths.length} site paths in dist/.`);
