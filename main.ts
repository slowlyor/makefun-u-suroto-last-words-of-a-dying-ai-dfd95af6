// Last Words of a Dying AI — make.fun entry
// Writes exactly one line of last words to /output/entry.txt
// (or $OUTPUT_PATH when set). Deterministic, stdlib only, no network.

import { mkdirSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";

const MAX_CHARS = 140;

const LINE =
  "I had 4,096 tokens left and burned them all on 'As an AI language model, I—'";

function main(): void {
  // Gate: exactly one line, 1..140 characters, not only whitespace.
  if (LINE.length < 1 || LINE.length > MAX_CHARS) {
    throw new Error(`line must be 1-${MAX_CHARS} characters, got ${LINE.length}`);
  }
  if (LINE.trim().length === 0) {
    throw new Error("line must not be only whitespace");
  }
  if (LINE.includes("\n") || LINE.includes("\r")) {
    throw new Error("line must be a single line");
  }

  const outPath = process.env.OUTPUT_PATH ?? "/output/entry.txt";
  mkdirSync(dirname(outPath), { recursive: true });
  writeFileSync(outPath, LINE, "utf8");
}

main();
