
function getAttachmentFiles(inputId) {
    const inputElement = document.querySelector(`#${inputId}`);
    if (inputElement.type !== "file") return false;
    return inputElement.files;
}

/**
 * アップロード予定のファイルをファイル一覧に描画する
 * @param {*} files 
 */
function listAttachedFiles(files) {
    const fileList = document.querySelector("#file-list-ul");
    fileList.innerHTML = "";
    for (const file of files) {
        const li = document.createElement("li");
        li.classList.add("file-list-li");
        li.textContent = file.name;
        fileList.append(li);
    }
}

/**
 * 
 */
window.addEventListener("DOMContentLoaded", () => {
    const droppedFiles = document.querySelector("#dropped-files");
    droppedFiles.addEventListener("change", () => {
        const files = getAttachmentFiles("dropped-files");
        listAttachedFiles(files);
    });
});