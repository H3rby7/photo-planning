const upload = document.getElementById("upload");
const preview = document.getElementById("json-preview")

/*
 * @param {js object} data 
 */
function loadNewData(data) {
  console.log(data);
  const asString = JSON.stringify(data);
  preview.innerHTML = asString;
  localStorage.setItem("photo-planner-data", asString);
  // TODO more stuff.
  
}

function loadFromLocalStorage() {
  const localData = localStorage.getItem("photo-planner-data");
  if (localData) {
    console.log("loading from local storage.");
    loadNewData(JSON.parse(localData));
  } else {
    console.log("no data present in local storage.");
  }
}

function loadLocalJSON() {
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

upload.addEventListener('change', loadLocalJSON);
loadFromLocalStorage();