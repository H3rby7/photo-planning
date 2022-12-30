import { permute } from "../lib/helper_functions.js";
import { InputData } from "./classes.js";
import { Prices, rateShotList, printSummaryForShotList } from "./rate.js";

const upload = document.getElementById("upload");
const preview = document.getElementById("json-preview");
const btn_optimize = document.getElementById("optimize");

let data;
const prices = new Prices(4, 7, 2);

/**
 * Load the given data into the application and save to local storage
 * 
 * @param {!Object} nextData
 */
function loadNewData(nextData) {
  data = InputData.fromSaveable(nextData);
  console.log(data);
  printSummaryForShotList(data.shots, prices);
  const saveFile = data.toSaveable();
  preview.innerHTML = JSON.stringify(saveFile, null, 2);
  localStorage.setItem("photo-planner-data", JSON.stringify(saveFile));
}

/**
 * Load data from local storage, if present.
 */
function loadFromLocalStorage() {
  const localData = localStorage.getItem("photo-planner-data");
  if (localData) {
    console.log("loading from local storage.");
    loadNewData(JSON.parse(localData));
  } else {
    console.log("no data present in local storage.");
  }
}

/**
 * Handle the json file of the upload input and load into application
 */
function loadJSONFile() {
  const file = upload.files[0];
  if (file) {
    const reader = new FileReader();
    reader.readAsText(file, "UTF-8");
    reader.onload = function (evt) {
      const data = JSON.parse(evt.target.result);
      loadNewData(data);
    }
    reader.onerror = function (evt) {
      alert("error reading file");
    }
  }
}

/**
 * @param {InputData} inputData
 */
function optimizeShotList(inputData) {
  if (!inputData) {
    alert("Please load a file first!");
    return;
  }
  const startTime = Date.now();
  let best = {
    shots: [],
    rating: Infinity
  };

  permute(inputData.shots, action, () => {
    printSummaryForShotList(best.shots, prices);
  });

  console.log("********** RESULT **********");
  const timeTaken = Date.now() - startTime;
  console.log(`Took ${timeTaken} millis.`);
  printSummaryForShotList(best.shots, prices);

  function action(shots) {
    const rating = rateShotList(shots, prices, best.rating);
    if (rating < best.rating) {
      best = {shots: shots.map(s => s.copy()), rating: rating};
    }
  }

}

upload.addEventListener('change', loadJSONFile);
btn_optimize.addEventListener('click', () => optimizeShotList(data));
loadFromLocalStorage();
