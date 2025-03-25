const dropArea = document.querySelector("#drop-area");
dropArea.addEventListener("dragover", (event) => onDragOver(event));
dropArea.addEventListener("dragleave", (event) => onDragLeave(event));
dropArea.addEventListener("drop", (event) => onDrop(event));

function onDragOver(event) {
	event.preventDefault();
	dropArea.classList.add("_drag-over");
}

function onDragLeave(event) {
	event.preventDefault();
	dropArea.classList.remove("_drag-over");
}

function onDrop(event) {
	event.preventDefault();
	dropArea.classList.remove("_drag-over");
	const files = event.dataTransfer.files;
	for (const file of files) {
		selectedFiles.push(file);
	}
	updateState();
}
