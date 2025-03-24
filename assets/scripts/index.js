
function getAttachmentFiles(inputId) {
    const inputElement = document.querySelector(`#${inputId}`);
    if (inputElement.type !== "file") return false;
    return inputElement.files;
}

/**
 * アップロード予定のファイルをファイル一覧に描画する
 * @param {*} files 
 */
function renderAttachedFiles(files) {
    const fileList = document.querySelector("#file-list-ul");
    fileList.innerHTML = "";
    let i = 0;
    for (const file of files) {
        const li = document.createElement("li");
        li.classList.add("file-list-li");
        li.textContent = file.name;

        // 削除ボタン
        const removeButton = createRemoveButton(i)

        li.append(removeButton);
        fileList.append(li);
        i++;
    }
}

function createRemoveButton(i) {
    const removeButton = document.createElement("button");
    removeButton.classList.add("remove-button");
    const iconImg = document.createElement("img");
    iconImg.src= "./assets/images/trashIcon.svg";
    removeButton.append(iconImg);
    removeButton.dataset.fileIndex = i;

    // 削除イベント
    removeButton.addEventListener("click", (event) => {
        console.log("remove", event.currentTarget.dataset.fileIndex);
    });
    return removeButton;
}

/**
 * 
 */
window.addEventListener("DOMContentLoaded", () => {
    const droppedFiles = document.querySelector("#dropped-files");
    droppedFiles.addEventListener("change", () => {
        const files = getAttachmentFiles("dropped-files");
        renderAttachedFiles(files);
    });
});