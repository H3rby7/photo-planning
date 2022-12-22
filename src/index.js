const upload = document.getElementById("upload");
const preview = document.getElementById("json-preview")

function updatePreview() {
  const file = upload.files[0];
  if (file) {
    const reader = new FileReader();
    reader.readAsText(file, "UTF-8");
    reader.onload = function (evt) {
      preview.innerHTML = evt.target.result;
    }
    reader.onerror = function (evt) {
      preview.innerHTML = "error reading file";
    }
  }
}

upload.addEventListener('change', updatePreview);