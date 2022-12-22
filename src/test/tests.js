import { Character, CharacterInCostume, InputData, Shot } from "../app/classes.js";
import { Rules } from "../app/rules.js";

const RUN_TESTS = true;

(() => {

  let shotId = 0;

  if (!RUN_TESTS) {
    return;
  }

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

  test_loadSaveLoad();
  function test_loadSaveLoad() {
    const loadedData = InputData.fromSaveable(testInput);
    const savedData = loadedData.toSaveable();
    const validationData = InputData.fromSaveable(savedData);
    printTestResult("test_loadSaveLoad", loadedData.length !== validationData.length ? "Data should not change over load and save!" : null);
  }

  test_locationChange_sameLocation_expect_false();
  function test_locationChange_sameLocation_expect_false() {
    const result = Rules.locationChange(
      helpers_createTestShot("throne"),
      helpers_createTestShot("throne")
    );
    printTestResult("test_locationChange_sameLocation_expect_false", result ? "There should be no change in location!" : null);
  }

  test_locationChange_differentLocation_expect_true();
  function test_locationChange_differentLocation_expect_true() {
    const result = Rules.locationChange(
      helpers_createTestShot("throne"),
      helpers_createTestShot("forest")
    );
    printTestResult("test_locationChange_differentLocation_expect_true", result ? null : "There should be a change in location!");
  }

  function helpers_createTestShot(location, charactersInCostume, ...props) {
    return new Shot("shot #" + (shotId++), charactersInCostume, props, location);
  }
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
      console.debug(`TEST SUCCESS - ${testName}!`);
    }
  }
})();