import { Character, CharacterInCostume, InputData, Shot } from "../app/classes.js";
import { Rules } from "../app/rules.js";

const RUN_TESTS = true;

(() => {

  let shotId = 0;
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
    printTestResult(testName, msg);
  }

  TESTS["locationChange_sameLocation_expect_false"] = (testName) => {
    // SETUP
    const l1 = helpers_createTestShot("throne");
    const l2 = helpers_createTestShot("throne");
    // EXECUTION
    const locationChanges = Rules.locationChange(l1, l2);
    // INTERPRETATION
    let msg = null;
    if (locationChanges) {
      msg = "There should be no change in location!";
    }
    printTestResult("test_locationChange_sameLocation_expect_false", msg);
  }
  
  TESTS["locationChange_noLocations_expect_false"] = (testName) => {
    // SETUP
    const l1 = helpers_createTestShot();
    const l2 = helpers_createTestShot();
    // EXECUTION
    const locationChanges = Rules.locationChange(l1, l2);
    // INTERPRETATION
    let msg = null;
    if (locationChanges) {
      msg = "There should be no change in location!";
    }
    printTestResult(testName, msg);
  }

  TESTS["locationChange_differentLocation_expect_true"] = (testName) => {
    // SETUP
    const l1 = helpers_createTestShot("throne");
    const l2 = helpers_createTestShot("forest");
    // EXECUTION
    const locationChanges = Rules.locationChange(l1, l2);
    // INTERPRETATION
    let msg = null;
    if (!locationChanges) {
      msg = "There should be a change in location!";
    }
    printTestResult(testName, msg);
  }

  TESTS["actorNeedsChange_sameCostume_expect_false"] = (testName) => {
    // SETUP
    const c1 = helpers_createTestCharactersInCostume("queen", "soldier outfit");
    const c2 = helpers_createTestCharactersInCostume("queen", "soldier outfit");
    // EXECUTION
    const actorsNeedingToChange = Rules.actorNeedsChange(
      helpers_createTestShot(null, [c1]),
      helpers_createTestShot(null, [c2])
    );
    // INTERPRETATION
    let msg = null;
    if (actorsNeedingToChange) {
      msg = "No one should need to change!";
    }
    printTestResult(testName, msg);
  }

  TESTS["actorNeedsChange_differentActors_expect_false"] = (testName) => {
    // SETUP
    const c1 = helpers_createTestCharactersInCostume("queen", "soldier outfit");
    const c2 = helpers_createTestCharactersInCostume("barber", "barber outfit");
    // EXECUTION
    const actorsNeedingToChange = Rules.actorNeedsChange(
      helpers_createTestShot(null, [c1]),
      helpers_createTestShot(null, [c2])
    );
    // INTERPRETATION
    let msg = null;
    if (actorsNeedingToChange) {
      msg = "No one should need to change!";
    }
    printTestResult(testName, msg);
  }

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