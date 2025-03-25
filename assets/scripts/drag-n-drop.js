const dropArea = document.querySelector("#drop-area");
dropArea.addEventListener("dragover", (event) => onDragOver(event));
dropArea.addEventListener("dragleave", (event) => onDragLeave(event));
dropArea.addEventListener("drop", (event) => onDrop(event));

function onDragOver(event) {
    event.preventDefault();
    // console.log(event)
}
function onDragLeave(event) {
    event.preventDefault();
    // console.log(event)
}
function onDrop(event) {
    event.preventDefault();
    const files = event.dataTransfer.files;
    for (const file of files) {
        selectedFiles.push(file);
    }
    renderAttachedFiles(selectedFiles);
    toggleReasonButtonAbility();
}