const selectedFiles = [];

/**
 * inputタグにアタッチされたfilesを取得する
 * @param {string} inputId - 対象のinputタグのid
 * @returns files
 */
function getAttachedFiles(inputId) {
	const inputElement = document.querySelector(`#${inputId}`);
	if (inputElement.type !== "file") return false;
	return inputElement.files;
}

/**
 * selectedFilesをファイル一覧として、file-list-ulに描画する
 * @param {file[]} selectedFiles
 */
function renderAttachedFiles(selectedFiles) {
	const fileList = document.querySelector("#file-list-ul");
	fileList.innerHTML = "";
	let i = 0;
	for (const file of selectedFiles) {
		const li = document.createElement("li");
		li.classList.add("file-list-li");
		li.textContent = file.name;

		// 削除ボタン
		const removeButton = createRemoveButton(i);
		li.append(removeButton);

		fileList.append(li);
		i++;
	}
}

/**
 * 選択ファイルリストの削除ボタンを生成する関数
 * 削除ファイルを特定するためのindexをiとして
 * data-file-index属性に付与しておく
 * @param {number} i
 * @returns
 */
function createRemoveButton(i) {
	const removeButton = document.createElement("button");
	removeButton.classList.add("remove-button");
	const iconImg = document.createElement("img");
	iconImg.src = "./assets/images/trashIcon.svg";
	removeButton.append(iconImg);
	removeButton.dataset.fileIndex = i;

	// 削除イベント
	removeButton.addEventListener("click", (event) => {
		const indexForRemove = event.currentTarget.dataset.fileIndex;
		selectedFiles.splice(indexForRemove, 1);
		renderAttachedFiles(selectedFiles);
	});
	return removeButton;
}

/**
 *
 */
window.addEventListener("DOMContentLoaded", () => {
	const droppedFiles = document.querySelector("#dropped-files");

	// input要素にファイルが選択されたとき、input要素のfilesから
	// 状態管理用変数のselectedFiles: file[]にファイルを格納する
	droppedFiles.addEventListener("change", () => {
		const files = getAttachedFiles("dropped-files");
		for (const file of files) {
			selectedFiles.push(file);
		}
		renderAttachedFiles(selectedFiles);

		// 同一ファイルを連続で選択できるようにinputを初期化
		droppedFiles.value = "";
	});
});
