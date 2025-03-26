const express = require("express");
const app = express();
const PORT = 3000;
const path = require("node:path");
const fs = require("node:fs");
const cors = require("cors");
const multer = require("multer");
const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, path.join(__dirname, "tmp/uploads"));
	},
	filename: (req, file, cb) => {
		const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
		const extension = file.originalname.split(".").pop();
		const originalName = decodeURIComponent(file.originalname);
		// 同じファイル名を認めないようにすれば、suffixいらない？
		cb(null, `${originalName}-${uniqueSuffix}.${extension}`);
	},
});
const upload = multer({ storage: storage });

// CORSミドルウェア設定
app.use(
	cors({
		origin: "*",
	}),
);

app.get("/", (req, res) => {
	res.send("Hello World");
});

app.post("/upload", upload.array("files", 10), (req, res) => {
	res.header("Access-Control-Allow-Origin", "*");

	// ファイルがアップロードされていない場合
	if (!req.files) {
		return res.status(400).send("No file attached");
	}

	// 持込事由パラメータ
	const reason = decodeURIComponent(req.query.reason);

	// uploaded files
	// req.filesとreasonを渡して、selenium でFENCEで持ち出し処理を行う
	// console.log(req.files);
	for (const file of req.files) {
		console.log("reason: ", reason);
		console.log("filePath: ", file.path);
		console.log("originalName: ", decodeURIComponent(file.originalname));

		// この削除処理は、イテレート中の個別ファイルを削除するので、selenium側で、for処理内で削除する
		setTimeout(() => {
			fs.unlink(file.path, (err) => {
				if (err) {
					console.error("delete fail...");
				} else {
					console.log(`file deleted: ${file.filename}`);
				}
			});
		}, 5000);
	}
	res.send("OK");
});

app.listen(PORT);
console.log(`listening on Port ${PORT}`);
