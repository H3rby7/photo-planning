import { InputData } from "../app/classes.js";
import { addTests_grouping } from "./grouping.js";
import { addTests_rateActorIdle } from "./rate_costOfActorIdle.js";
import { addTests_rateShotChange } from "./rate_shotlist.js";
import { addTests_rule_actorNeedsChange } from "./rule_actorNeedsChange.js";
import { addTests_rule_locationChange } from "./rule_locationChange.js";
import { TestHelpers, Tests } from "./test_helpers.js";

/**
 * This weird method of testing is due to legacy code from running in a browser
 */

export function runTests() {
  console.log("Running tests ...");

  const TESTS = new Tests();

  TESTS.add("LOAD SAVE LOAD -> EXPECTING no errors.", (testName) => {
    // SETUP
    const testInput = {
      "people": [
        {"name": "Alex"},
        {"name": "Kim"}
      ],
      "characters": [
        {"characterName": "protagonist", "person": "Alex"},
        {"characterName": "antagonist", "person": "Kim"}
      ],
      "shots": [
        {
          "shotName": "opening number",
          "characters": [
            {"character": "protagonist", "costume": "1970s grey suit"},
            {"character": "antagonist", "costume": "fancy disco outfit"}
          ],
          "props": ["book", "scepter", "fruit"],
          "location": "throne"
        }
      ]
    };
    // EXECUTION
    const loadedData = InputData.fromSaveable(testInput);
    const savedData = loadedData.toSaveable();
    const validationData = InputData.fromSaveable(savedData);
    // INTERPRETATION
    let msg = null;
    if (loadedData.length !== validationData.length) {
      msg = "Data should not change over load and save!";
    }
    return TestHelpers.printTestResult(testName, msg);
  });

  addTests_rule_locationChange(TESTS);
  addTests_rule_actorNeedsChange(TESTS);
  addTests_rateShotChange(TESTS);
  addTests_rateActorIdle(TESTS);
  addTests_grouping(TESTS);

  TESTS.runTests();

}