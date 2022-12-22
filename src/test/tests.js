import { Character, CharacterInCostume, InputData, Shot } from "../app/classes.js";
import { addTests_rule_actorNeedsChange } from "./rule_actorNeedsChange.js";
import { addTests_rule_locationChange } from "./rule_locationChange.js";
import { TestHelpers } from "./test_helpers.js";

const RUN_TESTS = true;

(() => {

  const TESTS = {};

  if (!RUN_TESTS) {
    return;
  }

  TESTS["loadSaveLoad"] = (testName) => {
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
    TestHelpers.printTestResult(testName, msg);
  }

  addTests_rule_locationChange(TESTS);
  addTests_rule_actorNeedsChange(TESTS);

  Object.keys(TESTS).forEach(k => TESTS[k](k));

  /**
   * Create a Shot for Tests
   * 
   * @param {?string} location 
   * @param {?CharacterInCostume[]} charactersInCostume 
   * @param  {...string} props 
   * @returns {!Shot} with the given properties and incremented shotname ID 'shot #X'.
   */
  function helpers_createTestShot(location, charactersInCostume, ...props) {
    return new Shot("shot #" + (shotId++), charactersInCostume, props, location);
  }

  /**
   * Create a Character in Costume for Tests
   * 
   * @param {!string} character Name of the character
   * @param {!string} costume name of the costume (identifier)
   * @returns {!CharacterInCostume}, where the actor will be 'actor of @param character'
   */
  function helpers_createTestCharactersInCostume(character, costume) {
    return new CharacterInCostume(new Character(character, "actor of " + character), costume);
  }

  /**
   * Print Test result to console. IMPORTANT: only pass @param msg if the test failed!
   * 
   * @param {!string} testName Name of the test (function)
   * @param {?msg} msg Only if test failed; The details.
   */
  function printTestResult(testName, msg) {
    if (msg) {
      console.error(`TEST ERROR   - ${testName}: '${msg}'`);
    } else {
      console.debug(`TEST SUCCESS - ${testName}`);
    }
  }
})();