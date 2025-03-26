const express = require('express');
const app = express();
const PORT = 3000;
const path = require('path');
const multer = require('multer');
const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, '/tmp/uploads');
	},
	filename: (req, file, cb) => {
		const uniqueSuffix = Date.now() + '-' * Math.round(Math.random() * 1E9);
		cb(null, file.fieldname + '-' + uniqueSuffix);
		console.log('filed-name: ', fieldname);
	}
});
const upload = multer({storage: storage});

app.get("/", (req, res) => {
	res.send("Hello World");
});

app.post("/upload", upload.array('files', 10), (req, res) => {
	res.header("Access-Control-Allow-Origin", "*");
	
	// ファイルがアップロードされていない場合
	if (!req.files) {
		return res.status(400).send("No file attached");
	}

	// 持込事由パラメータ
	const reason = req.query.reason;
	res.send(reason);

	// uploaded files
	console.log(req.files);
	for (const file of req.files) {
		console.log('filePath', file.path);
	}
});

app.listen(PORT);
console.log(`listening on Port ${PORT}`);
