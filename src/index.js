/**
 * NodeJS Entrypoint
 */

const DEBUG_NODE_SCRIPT = false;
if (DEBUG_NODE_SCRIPT) console.log(process.argv);

const possibleCommands = [
  { cmd: 'optimize', args: {required: ['path/to/file.json'], optional: [] }, cb: runOptimize},
  { cmd: 'test', args: {required: [], optional: [] }, cb: runTests},
];

function printHelp(cause) {
  console.log(cause);
  console.log("");
  console.log("Usage:");
  console.log("  node index.js [command] [options]");
  console.log("");
  console.log("Possible Commands:");
  possibleCommands.forEach(c => {
    console.log(`  - '${c.cmd}'`);
  });
  possibleCommands.forEach(c => {
    console.log("");
    console.log(`Example '${c.cmd}':`);
    console.log(`  node index.js ${c.cmd}${c.args.required.reduce((prev, cur) => prev += " " + cur, "")}`);
  });
  console.log("");
}

function runTests(options) {
  console.log("Running tests ...");
}

function runOptimize(options) {
  console.log("Running optimization ...");
}

// const runtime = process.argv[0];
// const file = process.argv[1];
const command = possibleCommands.find(c => c.cmd === process.argv[2]);
if (!command) {
  return printHelp("Please provide a command.");
}

let options = [];
if (process.argv.length > 3) {
  options = process.argv.slice(3);
}

if (options.length < command.args.required.length) {
  return printHelp("Please provide the proper options.");
}

command.cb(options);
