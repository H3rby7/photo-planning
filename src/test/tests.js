import { InputData } from "../app/classes.js";

const RUN_TESTS = true;

(() => {
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

  testLoadSaveLoad();

  function testLoadSaveLoad() {
    const loadedData = InputData.fromSaveable(testInput);
    const savedData = loadedData.toSaveable();
    const validationData = InputData.fromSaveable(savedData);
    if (loadedData.length !== validationData.length) {
      throw "TEST ERROR - Data should not change over load and save!";
    } else {
      console.log("TEST 'testLoadSaveLoad' successful!")
    }
  }

})();