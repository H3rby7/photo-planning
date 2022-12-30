import { ActorIdle } from "../app/memory.js";
import { isActorIdleAffectedByChange } from "../app/optimizer.js";
import { TestHelpers, Tests } from "./test_helpers.js";

// shotlist:  0, 1, 2, 3, 4, 5, 6, 7
// idle:      O, O, X, X, X, X, O, O

const idle = new ActorIdle("A", 2, 5, 0);

/**
 * 
 * @param {!Tests} TESTS the map of tests
 */
export function addTests_idleAffectedByChange(TESTS) {

  TESTS.add("idleAffectedByChange_changesAfterIdle_expect_FALSE", (testName) => {
    // EXECUTION
    const result = isActorIdleAffectedByChange(idle, 6, 7);
    // INTERPRETATION
    let msg = null;
    if (result) {
      msg = "Expected Idle to NOT be affected!";
    }
    return TestHelpers.printTestResult(testName, msg);
  });

  TESTS.add("idleAffectedByChange_changesBeforeIdle_expect_FALSE", (testName) => {
    // EXECUTION
    const result = isActorIdleAffectedByChange(idle, 0, 1);
    // INTERPRETATION
    let msg = null;
    if (result) {
      msg = "Expected Idle to NOT be affected!";
    }
    return TestHelpers.printTestResult(testName, msg);
  });

  TESTS.add("idleAffectedByChange_changesInsideIdle_expect_FALSE", (testName) => {
    // EXECUTION
    const result = isActorIdleAffectedByChange(idle, 3, 4);
    // INTERPRETATION
    let msg = null;
    if (result) {
      msg = "Expected Idle to NOT be affected!";
    }
    return TestHelpers.printTestResult(testName, msg);
  });

  TESTS.add("idleAffectedByChange_changesAtIdleStart_expect_TRUE", (testName) => {
    // EXECUTION
    const result = isActorIdleAffectedByChange(idle, 1, 2);
    // INTERPRETATION
    let msg = null;
    if (!result) {
      msg = "Expected Idle to BE affected!";
    }
    return TestHelpers.printTestResult(testName, msg);
  });

  TESTS.add("idleAffectedByChange_changesIntoIdleStart_expect_TRUE", (testName) => {
    // EXECUTION
    const result = isActorIdleAffectedByChange(idle, 0, 3);
    // INTERPRETATION
    let msg = null;
    if (!result) {
      msg = "Expected Idle to BE affected!";
    }
    return TestHelpers.printTestResult(testName, msg);
  });

  TESTS.add("idleAffectedByChange_changesUpToIdleEnd_expect_TRUE", (testName) => {
    // EXECUTION
    const result = isActorIdleAffectedByChange(idle, 0, 5);
    // INTERPRETATION
    let msg = null;
    if (!result) {
      msg = "Expected Idle to BE affected!";
    }
    return TestHelpers.printTestResult(testName, msg);
  });

  TESTS.add("idleAffectedByChange_changesFromInside_expect_TRUE", (testName) => {
    // EXECUTION
    const result = isActorIdleAffectedByChange(idle, 4, 7);
    // INTERPRETATION
    let msg = null;
    if (!result) {
      msg = "Expected Idle to BE affected!";
    }
    return TestHelpers.printTestResult(testName, msg);
  });

  TESTS.add("idleAffectedByChange_changesFromEnd_expect_TRUE", (testName) => {
    // EXECUTION
    const result = isActorIdleAffectedByChange(idle, 5, 7);
    // INTERPRETATION
    let msg = null;
    if (!result) {
      msg = "Expected Idle to BE affected!";
    }
    return TestHelpers.printTestResult(testName, msg);
  });

  TESTS.add("idleAffectedByChange_changesAreTheBounds_expect_TRUE", (testName) => {
    // EXECUTION
    const result = isActorIdleAffectedByChange(idle, 2, 5);
    // INTERPRETATION
    let msg = null;
    if (!result) {
      msg = "Expected Idle to BE affected!";
    }
    return TestHelpers.printTestResult(testName, msg);
  });

  TESTS.add("idleAffectedByChange_changesAtStart_expect_TRUE", (testName) => {
    // EXECUTION
    const result = isActorIdleAffectedByChange(idle, 2, 3);
    // INTERPRETATION
    let msg = null;
    if (!result) {
      msg = "Expected Idle to BE affected!";
    }
    return TestHelpers.printTestResult(testName, msg);
  });

  TESTS.add("idleAffectedByChange_changesAtEnd_expect_TRUE", (testName) => {
    // EXECUTION
    const result = isActorIdleAffectedByChange(idle, 4, 5);
    // INTERPRETATION
    let msg = null;
    if (!result) {
      msg = "Expected Idle to BE affected!";
    }
    return TestHelpers.printTestResult(testName, msg);
  });

}
