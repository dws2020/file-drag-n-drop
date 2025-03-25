let selectedFiles = [];

// biome-ignore lint: no problem
!(function () {
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
			updateState();

			// 同一ファイルを連続で選択できるようにinputを初期化
			droppedFiles.value = "";
		});

		// reasonButtonにイベント設定
		const reasonButtons = document.querySelectorAll(".reason-button");
		for (const reasonButton of reasonButtons) {
			reasonButton.addEventListener("click", (event) => {
				// disableのときは処理を中止
				if (event.currentTarget.classList.contains("reason-button-disabled"))
					return false;

				const reason = event.currentTarget.textContent;
				clickReasonButton(reason);
			});
		}
	});

	function clickReasonButton(reason) {
		const formData = generateFormData();
		postFile(formData);
	}

	/**
	 * FormDataにselectedFilesをappendして、送信準備
	 * @returns formData -FormData
	 */
	function generateFormData() {
		const formData = new FormData();
		for (const file of selectedFiles) {
			formData.append("file[]", file);
		}
		return formData;
	}

	/**
	 * APIエンドポイントにPOST送信
	 * @param {*} formData
	 */
	async function postFile(formData) {
		const url = "http://localhost:3000/upload";
		try {
			const res = await fetch(url, {
				method: "POST",
				body: formData,
			});
			const data = await res.text();
			console.log(data);
			selectedFiles = [];
			updateState();
		} catch (e) {
			console.error(e);
		}
	}
})();

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
		updateState();
	});
	return removeButton;
}

function isSetFiles() {
	return selectedFiles.length > 0 ? true : false;
}

/**
 * renderAttachedFilesとtoggleReasonButtonAbilityをまとめて実行
 */
function updateState() {
	renderAttachedFiles(selectedFiles);
	toggleReasonButtonAbility();
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
 * selectedFilesにファイルがあれば、事由ボタンを有効化
 */
function toggleReasonButtonAbility() {
	const reasonButtons = document.querySelectorAll(".reason-button");
	for (const reasonButton of reasonButtons) {
		if (isSetFiles()) {
			reasonButton.classList.remove("reason-button-disabled");
		} else {
			reasonButton.classList.add("reason-button-disabled");
		}
	}
}
