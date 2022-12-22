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
    loadedData = InputData.fromSaveable(testInput);
    savedData = loadedData.toSaveable();
    validationData = InputData.fromSaveable(savedData);
    if (loadedData.length !== validationData.length) {
      throw "TEST ERROR - Data should not change over load and save!";
    } else {
      console.log("TEST 'testLoadSaveLoad' successful!")
    }
  }

})();