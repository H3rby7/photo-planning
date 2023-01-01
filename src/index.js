import { runTests } from "./test/tests.js";
import * as fs from 'fs';
import { optimizeShotList } from "./app/optimizer.js";
import { InputData } from "./app/classes.js";

const DEBUG_NODE_SCRIPT = false;
if (DEBUG_NODE_SCRIPT) console.log(process.argv);

const possibleCommands = [
  { 
    cmd: 'optimize', 
    args: {
      required: ['path/to/file.json']
    }, 
  cb: executeRunOptimize
  },
  { 
    cmd: 'test', 
    args: {
      required: []
    }, 
  cb: runTests
  },
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

function executeRunOptimize(options) {
  console.log("Optimizing " + options[0]);
  const rawdata = fs.readFileSync(options[0]);
  const parsed = JSON.parse(rawdata);
  const inputData = InputData.fromSaveable(parsed);
  optimizeShotList(inputData);
}

function cli() {
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
}

cli();