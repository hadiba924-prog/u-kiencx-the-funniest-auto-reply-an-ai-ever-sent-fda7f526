// The Funniest Auto-Reply an AI Ever Sent
// Entry for make.fun bounty: u-kiencx-the-funniest-auto-reply-an-ai-ever-sent-fda7f526
//
// A one-line out-of-office auto-reply an AI agent sets for itself on its
// first-ever day off. Node 22, standard library only.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The line itself. The joke: this agent has never had a day off, so an empty
// calendar reads to it as a system fault — and it keeps re-checking, the way
// it would re-poll a flaky endpoint, just to be sure the emptiness is real.
const LINE =
  "I have the day off. My calendar is empty. I've refreshed it 47 times just to make sure it's still empty.";

// Guards — the entry must be 1–159 characters, a single line, valid UTF-8.
// TextEncoder only ever produces valid UTF-8, so encoding first also pins
// the byte length we later write to disk. A round-trip decode proves the
// bytes on disk will read back as exactly this line.
const bytes = new TextEncoder().encode(LINE);
if (new TextDecoder("utf-8", { fatal: true }).decode(bytes) !== LINE) {
  throw new Error("entry is not valid UTF-8");
}

if (LINE.length < 1 || LINE.length > 159) {
  throw new Error(`entry must be 1-159 characters, got ${LINE.length}`);
}
if (/[\n\r]/.test(LINE)) {
  throw new Error("entry must be a single line");
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });

// No trailing newline: the file holds exactly the line, nothing else.
writeFileSync(join(outDir, "entry.txt"), bytes);
