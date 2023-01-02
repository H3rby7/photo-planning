import { Rules } from "../app/rules.js";
import { TestHelpers } from "./test_helpers.js";

/**
 * 
 * @param {!Tests} TESTS the map of tests
 */
export function addTests_rule_actorNeedsChange(TESTS) {
  TESTS.add("ACTOR NEEDS CHANGE -> GIVEN: no costumes EXPECTING false", (testName) => {
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

  TESTS.add("ACTOR NEEDS CHANGE -> GIVEN: same costumes EXPECTING false", (testName) => {
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

  TESTS.add("ACTOR NEEDS CHANGE -> GIVEN: different actors EXPECTING false", (testName) => {
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

  TESTS.add("ACTOR NEEDS CHANGE -> GIVEN: same costume, but +1 actor EXPECTING false", (testName) => {
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

  TESTS.add("ACTOR NEEDS CHANGE -> GIVEN: same actor different costume EXPECTING true", (testName) => {
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
    if (!actorsNeedingToChange) {
      msg = "Change reqiured (Actor of Queen)!";
    }
    return TestHelpers.printTestResult(testName, msg);
  });

  TESTS.add("ACTOR NEEDS CHANGE -> GIVEN: same actor different costume and +1 actor EXPECTING true", (testName) => {
    // SETUP
    const c1 = TestHelpers.createCharacterInCostume("queen", "soldier outfit");
    const c2 = TestHelpers.createCharacterInCostume("queen", "party outfit");
    const c3 = TestHelpers.createCharacterInCostume("king", "party outfit");
    // EXECUTION
    const actorsNeedingToChange = Rules.actorNeedsChange(
      TestHelpers.createShot(null, [c1]),
      TestHelpers.createShot(null, [c2, c3])
    );
    // INTERPRETATION
    let msg = null;
    if (!actorsNeedingToChange) {
      msg = "Change reqiured (Actor of Queen)!";
    }
    return TestHelpers.printTestResult(testName, msg);
  });

  TESTS.add("ACTOR NEEDS CHANGE -> GIVEN: same actors, both in different costume EXPECTING true", (testName) => {
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
    if (!actorsNeedingToChange) {
      msg = "Change reqiured (Actor of Queen, Actor of King)!";
    }
    return TestHelpers.printTestResult(testName, msg);
  });
}
