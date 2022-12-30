import { Character, CharacterInCostume, InputData, Person } from "../app/classes.js";
import { getActorsAffectedByChange } from "../app/optimizer.js";
import { TestHelpers, Tests } from "./test_helpers.js";

const ALEX = new CharacterInCostume(new Character("Character of Alex", new Person("Alex")), "anything");
const BERNARD = new CharacterInCostume(new Character("Character of Bernard", new Person("Bernard")), "anything");
const PATRICIA = new CharacterInCostume(new Character("Character of Patricia", new Person("Patricia")), "anything");
const KIM = new CharacterInCostume(new Character("Character of Kim", new Person("Kim")), "anything");

const EMPTY_SHOT = TestHelpers.createShot("", []);
/**
 * 
 * @param {!Tests} TESTS the map of tests
 */
export function addTests_getActorsAffectedByChange(TESTS) {

  TESTS.add("getActorsAffectedByChange_noChange_expecting_noOne", (testName) => {
    // SETUP
    const shotList = [
      TestHelpers.createShot(null, [BERNARD, KIM]),
      TestHelpers.createShot(null, [ALEX, PATRICIA]),
    ];
    const changedIndices = [];
    // EXECUTION
    const result = getActorsAffectedByChange(shotList, changedIndices);
    // INTERPRETATION
    let msg = null;
    if (result.length !== 0) {
      msg = "Expected no one to be affected.";
    }
    return TestHelpers.printTestResult(testName, msg);
  });

  TESTS.add("getActorsAffectedByChange_changeInShot0_expecting_Bernard&KIM", (testName) => {
    // SETUP
    const shotList = [
      TestHelpers.createShot(null, [BERNARD, KIM]),
      TestHelpers.createShot(null, [ALEX, PATRICIA]),
    ];
    const changedIndices = [0];
    // EXECUTION
    const result = getActorsAffectedByChange(shotList, changedIndices);
    // INTERPRETATION
    let msg = null;
    if (result.length !== 2 && result.includes("Bernard") && result.includes("Kim")) {
      msg = "Expected 'Bernard' and 'Kim' to be affected.";
    }
    return TestHelpers.printTestResult(testName, msg);
  });

  TESTS.add("getActorsAffectedByChange_changeInShot0&1_expecting_Bernard&KIM&Alex&Patricia", (testName) => {
    // SETUP
    const shotList = [
      TestHelpers.createShot(null, [BERNARD, KIM]),
      TestHelpers.createShot(null, [ALEX, PATRICIA]),
    ];
    const changedIndices = [0, 1];
    // EXECUTION
    const result = getActorsAffectedByChange(shotList, changedIndices);
    // INTERPRETATION
    let msg = null;
    if (result.length !== 4 && 
        result.includes("Bernard") && 
        result.includes("Kim") &&
        result.includes("Alex") &&
        result.includes("Patricia")) {
      msg = "Expected 'Bernard', 'Kim', 'Alex' and 'Patricia' to be affected.";
    }
    return TestHelpers.printTestResult(testName, msg);
  });


  TESTS.add("getActorsAffectedByChange_changeInShot1&3_expecting_Bernard", (testName) => {
    // SETUP
    const shotList = [
      TestHelpers.createShot(null, [BERNARD, KIM]),
      TestHelpers.createShot(null, [BERNARD]),
      TestHelpers.createShot(null, [KIM]),
      EMPTY_SHOT,
      TestHelpers.createShot(null, [ALEX, PATRICIA]),
    ];
    const changedIndices = [1, 3];
    // EXECUTION
    const result = getActorsAffectedByChange(shotList, changedIndices);
    // INTERPRETATION
    let msg = null;
    if (result.length[0] === "Bernard") {
      msg = "Expected 'Bernard' to be affected.";
    }
    return TestHelpers.printTestResult(testName, msg);
  });

}
