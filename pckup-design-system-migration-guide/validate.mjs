import { readFileSync, existsSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import vm from "node:vm";

const root = dirname(fileURLToPath(import.meta.url));
const read = (name) => readFileSync(resolve(root, name), "utf8");
const fail = (message) => {
  throw new Error(`migration-guide validation: ${message}`);
};
const assert = (condition, message) => {
  if (!condition) fail(message);
};

const requiredFiles = ["index.html", "styles.css", "data.js", "app.js"];
for (const file of requiredFiles) {
  assert(existsSync(resolve(root, file)), `missing ${file}`);
}

const html = read("index.html");
const css = read("styles.css");
const dataSource = read("data.js");
const appSource = read("app.js");

for (const reference of ["./styles.css", "./data.js", "./app.js"]) {
  assert(html.includes(reference), `index.html does not reference ${reference}`);
}

for (const id of [
  "facts",
  "workflow",
  "principles",
  "phase-nav",
  "phase-list",
  "reusable-list",
  "steady-loop",
  "phase-search",
  "progress-label",
  "progress-bar",
  "progress-detail",
  "reset-progress",
  "copy-master",
  "download-all",
  "toast",
]) {
  assert(html.includes(`id="${id}"`), `missing DOM hook #${id}`);
  assert(appSource.includes(`"${id}"`), `app.js does not reference #${id}`);
}

const htmlIds = [...html.matchAll(/\bid="([^"]+)"/g)].map((match) => match[1]);
assert(new Set(htmlIds).size === htmlIds.length, "index.html contains duplicate ids");
assert(!html.includes("http://"), "index.html contains an insecure http:// URL");
assert((css.match(/{/g) ?? []).length === (css.match(/}/g) ?? []).length, "styles.css braces are unbalanced");

new vm.Script(appSource, { filename: "app.js" });
const dataScript = new vm.Script(dataSource, { filename: "data.js" });
const sandbox = { window: {} };
vm.createContext(sandbox);
dataScript.runInContext(sandbox);

const guide = sandbox.window.PCKUP_MIGRATION_GUIDE;
assert(guide && typeof guide === "object", "data.js did not define window.PCKUP_MIGRATION_GUIDE");
assert(typeof guide.master === "string" && guide.master.length > 3000, "master operating context is missing or too short");
assert(Array.isArray(guide.phases) && guide.phases.length === 13, `expected 13 phases, found ${guide.phases?.length ?? 0}`);
assert(Array.isArray(guide.reusable) && guide.reusable.length >= 4, "expected at least four reusable prompts");
assert(Array.isArray(guide.workflow) && guide.workflow.length >= 6, "workflow is incomplete");
assert(Array.isArray(guide.principles) && guide.principles.length >= 6, "principles are incomplete");
assert(Array.isArray(guide.steady) && guide.steady.length >= 6, "steady-state workflow is incomplete");

const ids = new Set();
const numbers = new Set();
for (const [index, phase] of guide.phases.entries()) {
  for (const key of ["id", "number", "stage", "title", "summary", "depends", "duration", "gate", "prompt"]) {
    assert(typeof phase[key] === "string" && phase[key].trim().length > 0, `phase index ${index} is missing ${key}`);
  }
  assert(/^phase-\d{2}$/.test(phase.id), `invalid phase id ${phase.id}`);
  assert(/^\d{2}$/.test(phase.number), `invalid phase number ${phase.number}`);
  assert(!ids.has(phase.id), `duplicate phase id ${phase.id}`);
  assert(!numbers.has(phase.number), `duplicate phase number ${phase.number}`);
  ids.add(phase.id);
  numbers.add(phase.number);
  assert(phase.id === `phase-${phase.number}`, `${phase.id} does not match number ${phase.number}`);
  assert(Array.isArray(phase.outputs) && phase.outputs.length >= 3, `${phase.id} has incomplete outputs`);
  assert(phase.prompt.length > 1200, `${phase.id} prompt is unexpectedly short`);
  assert(/EXIT GATE|Exit gate/i.test(phase.prompt), `${phase.id} prompt does not contain an exit gate`);
}

for (const item of guide.reusable) {
  assert(typeof item.title === "string" && item.title.length > 0, "reusable prompt is missing a title");
  assert(typeof item.description === "string" && item.description.length > 0, `${item.title} is missing a description`);
  assert(typeof item.prompt === "string" && item.prompt.length > 500, `${item.title} prompt is unexpectedly short`);
}

assert(appSource.includes("guide.master"), "copy workflow does not prepend the master operating context");
assert(appSource.includes("localStorage"), "phase progress is not persisted");
assert(appSource.includes("Blob"), "download-all-prompts workflow is missing");

console.log(
  `migration-guide validation: OK (${guide.phases.length} phases, ${guide.reusable.length} reusable prompts, ${htmlIds.length} static DOM ids)`,
);
