import { InputData } from "./classes.js";

const upload = document.getElementById("upload");
const preview = document.getElementById("json-preview");

let data;

/**
 * Load the given data into the application and save to local storage
 * 
 * @param {!Object} nextData
 */
function loadNewData(nextData) {
  data = InputData.fromSaveable(nextData);
  console.log(data);
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

upload.addEventListener('change', loadJSONFile);
loadFromLocalStorage();
