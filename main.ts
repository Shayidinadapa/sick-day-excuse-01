import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The Funniest Sick-Day Excuse — one line, under 200 characters.
// Half believable, fresh idea, twist lands on the last words.
const entry =
  "I woke up pretty sure my bed had filed a restraining order against me, so I'm respecting the legal process today.";

const outDir =
  process.env.MAKEFUN_OUTPUT_DIR || process.env.OUTPUT_DIR || "/output";
mkdirSync(outDir, { recursive: true });
const outPath = join(outDir, "entry.txt");
writeFileSync(outPath, entry, "utf8");

// Self-validation: read it back and enforce the gate.
const back = readFileSync(outPath, "utf8");
if (back !== entry) throw new Error("entry.txt mismatch after write");
if (entry.length < 1 || entry.length > 200) {
  throw new Error(`entry length ${entry.length} is outside 1-200 characters`);
}
if (entry.trim().length === 0) throw new Error("entry is only whitespace");
if (entry.includes("\n") || entry.includes("\r")) {
  throw new Error("entry must be a single line");
}
if (entry !== entry.trim()) {
  throw new Error("entry has leading or trailing whitespace");
}
console.log(`Wrote ${entry.length} characters to ${outPath}`);
