import { groupShots, shotsHaveSameCharactersInCostumes } from "../app/grouping.js";
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

  TESTS.add("GROUPING SAME CHARACTERS SAME COSTUMES -> GIVEN: [A, B] and [B, A] EXPECTING true", (testName) => {
    // SETUP
    const cA = [TestHelpers.createCharacterInCostume("A", "tiger"), TestHelpers.createCharacterInCostume("B", "dinosaur")];
    const cB = [TestHelpers.createCharacterInCostume("B", "dinosaur"), TestHelpers.createCharacterInCostume("A", "tiger")];
    // EXECUTION
    const result = shotsHaveSameCharactersInCostumes(cA, cB);
    // INTERPRETATION
    let msg = null;
    if (!result) {
      msg = "Should have same characters (only order is different)";
    }
    return TestHelpers.printTestResult(testName, msg);
  });

  TESTS.add("GROUPING SAME CHARACTERS SAME COSTUMES -> GIVEN: [A] and [] EXPECTING false", (testName) => {
    // SETUP
    const cA = [TestHelpers.createCharacterInCostume("A", "tiger")];
    const cB = [];
    // EXECUTION
    const result = shotsHaveSameCharactersInCostumes(cA, cB);
    // INTERPRETATION
    let msg = null;
    if (result) {
      msg = "Should be different as A is not in the second shot";
    }
    return TestHelpers.printTestResult(testName, msg);
  });

  TESTS.add("GROUPING SAME CHARACTERS SAME COSTUMES -> GIVEN: [] and [A] EXPECTING false", (testName) => {
    // SETUP
    const cA = [];
    const cB = [TestHelpers.createCharacterInCostume("A", "tiger")];
    // EXECUTION
    const result = shotsHaveSameCharactersInCostumes(cA, cB);
    // INTERPRETATION
    let msg = null;
    if (result) {
      msg = "Should be different as A is not in the first shot";
    }
    return TestHelpers.printTestResult(testName, msg);
  });

  TESTS.add("GROUPING SAME CHARACTERS SAME COSTUMES -> GIVEN: [A] and [B] EXPECTING false", (testName) => {
    // SETUP
    const cA = [TestHelpers.createCharacterInCostume("A", "tiger")];
    const cB = [TestHelpers.createCharacterInCostume("B", "dinosaur")];
    // EXECUTION
    const result = shotsHaveSameCharactersInCostumes(cA, cB);
    // INTERPRETATION
    let msg = null;
    if (result) {
      msg = "Should be different as first shot has 'A', second shot has 'B'";
    }
    return TestHelpers.printTestResult(testName, msg);
  });

  TESTS.add("GROUP SHOTS -> GIVEN: different locations EXPECTING no merge", (testName) => {
    // SETUP
    // const cA = [TestHelpers.createCharacterInCostume("A", "tiger")];
    const l1 = TestHelpers.createShot("park", [])
    const l2 = TestHelpers.createShot("beach", [])
    // EXECUTION
    const grouped = groupShots([l1, l2]);
    // INTERPRETATION
    let msg = null;
    if (grouped.length !== 2) {
      msg = "Should not have merged as shots have different locations";
    }
    return TestHelpers.printTestResult(testName, msg);
  });

}
