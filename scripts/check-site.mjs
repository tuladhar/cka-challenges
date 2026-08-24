import { readFile, access } from "node:fs/promises";
import { resolve } from "node:path";

const root = resolve(import.meta.dirname, "..");
const required = ["cka/index.html", "achievers/index.html", "assets/styles.css", "assets/challenges.js", "data/achievers.json", "CLAUDE.md", ".claude/challenge-cka.md"];
await Promise.all(required.map((file) => access(resolve(root, file))));

const challengeSource = await readFile(resolve(root, "assets/challenges.js"), "utf8");
const domainCount = (challengeSource.match(/title: "(?:Storage|Workloads & Scheduling|Services & Networking|Cluster Architecture, Installation & Configuration|Troubleshooting)"/g) || []).length;
const competencyCount = (challengeSource.match(/\{ id: "[^"]+", title:/g) || []).length;
if (domainCount !== 5) throw new Error(`Expected 5 CKA domains; found ${domainCount}`);
if (competencyCount !== 27) throw new Error(`Expected 27 CKA competencies; found ${competencyCount}`);

const achievers = JSON.parse(await readFile(resolve(root, "data/achievers.json"), "utf8"));
if (!Array.isArray(achievers)) throw new Error("data/achievers.json must contain an array");
for (const person of achievers) {
  for (const key of ["name", "challenge", "achieved", "credly"]) if (!person[key]) throw new Error(`Achiever is missing ${key}`);
  if (person.challenge !== "CKA") throw new Error("Only CKA achievers are currently accepted");
  if (!person.credly.startsWith("https://www.credly.com/")) throw new Error(`Invalid Credly URL for ${person.name}`);
}

console.log("Site checks passed: 5 domains, 27 competencies, and valid achiever data.");

