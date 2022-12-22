import { Rules } from "../app/rules.js";
import { TestHelpers } from "./test_helpers.js";

/**
 * 
 * @param {!Tests} TESTS the map of tests
 */
export function addTests_rule_actorNeedsChange(TESTS) {
  TESTS.add("actorNeedsChange_noCostumes_expect_false", (testName) => {
    // SETUP
    const c1 = TestHelpers.createCharacterInCostume("queen");
    const c2 = TestHelpers.createCharacterInCostume("queen");
    // EXECUTION
    const actorsNeedingToChange = Rules.actorNeedsChange(
      TestHelpers.createShot(null, [c1]),
      TestHelpers.createShot(null, [c2]),
      true
    );
    // INTERPRETATION
    let msg = null;
    if (actorsNeedingToChange) {
      msg = "No one should need to change!";
    }
    return TestHelpers.printTestResult(testName, msg);
  });

  TESTS.add("actorNeedsChange_sameCostume_expect_false", (testName) => {
    // SETUP
    const c1 = TestHelpers.createCharacterInCostume("queen", "soldier outfit");
    const c2 = TestHelpers.createCharacterInCostume("queen", "soldier outfit");
    // EXECUTION
    const actorsNeedingToChange = Rules.actorNeedsChange(
      TestHelpers.createShot(null, [c1]),
      TestHelpers.createShot(null, [c2]),
      true
    );
    // INTERPRETATION
    let msg = null;
    if (actorsNeedingToChange) {
      msg = "No one should need to change!";
    }
    return TestHelpers.printTestResult(testName, msg);
  });

  TESTS.add("actorNeedsChange_differentActors_expect_false", (testName) => {
    // SETUP
    const c1 = TestHelpers.createCharacterInCostume("queen", "soldier outfit");
    const c2 = TestHelpers.createCharacterInCostume("barber", "barber outfit");
    // EXECUTION
    const actorsNeedingToChange = Rules.actorNeedsChange(
      TestHelpers.createShot(null, [c1]),
      TestHelpers.createShot(null, [c2]),
      true
    );
    // INTERPRETATION
    let msg = null;
    if (actorsNeedingToChange) {
      msg = "No one should need to change!";
    }
    return TestHelpers.printTestResult(testName, msg);
  });

  TESTS.add("actorNeedsChange_newActorSameCostumes_expect_false", (testName) => {
    // SETUP
    const c1 = TestHelpers.createCharacterInCostume("queen", "soldier outfit");
    const c2 = TestHelpers.createCharacterInCostume("barber", "barber outfit");
    // EXECUTION
    const actorsNeedingToChange = Rules.actorNeedsChange(
      TestHelpers.createShot(null, [c1]),
      TestHelpers.createShot(null, [c1, c2]),
      true
    );
    // INTERPRETATION
    let msg = null;
    if (actorsNeedingToChange) {
      msg = "No one should need to change!";
    }
    return TestHelpers.printTestResult(testName, msg);
  });

  TESTS.add("actorNeedsChange_differentCostumes_expect_actorOfQueen", (testName) => {
    // SETUP
    const c1 = TestHelpers.createCharacterInCostume("queen", "soldier outfit");
    const c2 = TestHelpers.createCharacterInCostume("queen", "party outfit");
    // EXECUTION
    const actorsNeedingToChange = Rules.actorNeedsChange(
      TestHelpers.createShot(null, [c1]),
      TestHelpers.createShot(null, [c2]),
      true
    );
    // INTERPRETATION
    let msg = null;
    if (actorsNeedingToChange.length !== 1 || actorsNeedingToChange[0].name !== "actor of queen") {
      msg = "Actor of Queen should need to change!";
    }
    return TestHelpers.printTestResult(testName, msg);
  });

  TESTS.add("actorNeedsChange_twoActorsOneHasdifferentCostume_expect_actorOfQueen", (testName) => {
    // SETUP
    const c1 = TestHelpers.createCharacterInCostume("queen", "soldier outfit");
    const c2 = TestHelpers.createCharacterInCostume("queen", "party outfit");
    const c3 = TestHelpers.createCharacterInCostume("king", "party outfit");
    // EXECUTION
    const actorsNeedingToChange = Rules.actorNeedsChange(
      TestHelpers.createShot(null, [c1]),
      TestHelpers.createShot(null, [c2, c3]),
      true
    );
    // INTERPRETATION
    let msg = null;
    if (actorsNeedingToChange.length !== 1 || actorsNeedingToChange[0].name !== "actor of queen") {
      msg = "Actor of Queen should need to change!";
    }
    return TestHelpers.printTestResult(testName, msg);
  });

  TESTS.add("actorNeedsChange_twoActorsHaveDifferentCostumes_expect_actorOfQueen", (testName) => {
    // SETUP
    const c1 = TestHelpers.createCharacterInCostume("queen", "soldier outfit");
    const c2 = TestHelpers.createCharacterInCostume("queen", "party outfit");
    const c3 = TestHelpers.createCharacterInCostume("king", "pope outfit");
    const c4 = TestHelpers.createCharacterInCostume("king", "party outfit");
    // EXECUTION
    const actorsNeedingToChange = Rules.actorNeedsChange(
      TestHelpers.createShot(null, [c1, c3]),
      TestHelpers.createShot(null, [c2, c4]),
      true
    );
    // INTERPRETATION
    let msg = null;
    if (actorsNeedingToChange.length !== 2 || actorsNeedingToChange[0].name !== "actor of queen" || actorsNeedingToChange[1].name !== "actor of king") {
      msg = "Two actors should need to change: ['Actor of Queen', 'Actor of King']!";
    }
    return TestHelpers.printTestResult(testName, msg);
  });

  TESTS.add("actorNeedsChange_differentCostumesNoDetails_expect_true", (testName) => {
    // SETUP
    const c1 = TestHelpers.createCharacterInCostume("queen", "soldier outfit");
    const c2 = TestHelpers.createCharacterInCostume("queen", "party outfit");
    // EXECUTION
    const actorsNeedingToChange = Rules.actorNeedsChange(
      TestHelpers.createShot(null, [c1]),
      TestHelpers.createShot(null, [c2]),
      false
    );
    // INTERPRETATION
    let msg = null;
    if (actorsNeedingToChange !== true) {
      msg = "Should only return 'true' (someone needs to change)";
    }
    return TestHelpers.printTestResult(testName, msg);
  });
}
