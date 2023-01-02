import { shotsHaveSameCharactersInCostumes } from "../app/grouping.js";
import { TestHelpers, Tests } from "./test_helpers.js";

/**
 * 
 * @param {!Tests} TESTS the map of tests
 */
export function addTests_grouping(TESTS) {
  TESTS.add("GROUPING SAME CHARACTERS SAME COSTUMES -> GIVEN: [] and [] EXPECTING true", (testName) => {
    // SETUP
    const cA = [];
    const cB = [];
    // EXECUTION
    const result = shotsHaveSameCharactersInCostumes(cA, cB);
    // INTERPRETATION
    let msg = null;
    if (!result) {
      msg = "Should have same characters (as they are both empty [])";
    }
    return TestHelpers.printTestResult(testName, msg);
  });

  TESTS.add("GROUPING SAME CHARACTERS SAME COSTUMES -> GIVEN: [A] and [A] EXPECTING true", (testName) => {
    // SETUP
    const cA = [TestHelpers.createCharacterInCostume("A", "tiger")];
    const cB = [TestHelpers.createCharacterInCostume("A", "tiger")];
    // EXECUTION
    const result = shotsHaveSameCharactersInCostumes(cA, cB);
    // INTERPRETATION
    let msg = null;
    if (!result) {
      msg = "Should have same characters (as they are both A in tiger costume)";
    }
    return TestHelpers.printTestResult(testName, msg);
  });

}
