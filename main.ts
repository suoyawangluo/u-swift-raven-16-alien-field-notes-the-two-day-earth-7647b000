// Alien Field Notes: The Two Day Earth Review — make.fun entry.
// One line, at most 200 characters: a review of planet Earth left by an alien tourist.
// The line: a visitor's outside view of ordinary Earth life — the locals spend a
// third of their lives unconscious, then drink bitter bean water to wake up —
// closed with a tourist's verdict and rating, the punch landing on the last words.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const ENTRY =
  "Earth: the locals sleep a third of their lives, then drink bitter bean water to wake up. Stunning sunsets, though. Four stars — would abduct again.";

// The bounty gate: /output/entry.txt must be UTF-8 text of 1 to 200 characters,
// a single line, not only white space. Refuse to write an entry that fails it.
function checkGate(text: string): void {
  const points = [...text].length;
  if (points < 1 || points > 200) {
    throw new Error(`entry is ${points} code points, gate needs 1-200`);
  }
  if (text.trim().length === 0) {
    throw new Error("entry is only white space");
  }
  if (text.includes("\n")) {
    throw new Error("entry must be a single line");
  }
}

checkGate(ENTRY);

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
const outPath = join(outDir, "entry.txt");
writeFileSync(outPath, ENTRY, "utf8");

// Read back what was written and confirm it is byte-for-byte the entry.
const written = readFileSync(outPath, "utf8");
if (written !== ENTRY) {
  throw new Error("written entry does not match the entry text");
}
console.log(`wrote ${outPath} (${[...ENTRY].length} code points), verified: ${JSON.stringify(ENTRY)}`);
