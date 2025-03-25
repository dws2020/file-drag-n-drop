const express = require("express");
const app = express();

app.get("/", (req, res) => {
	console.log("home");
	res.send("Hello World");
});

app.post("/upload", (req, res) => {
	console.log("upload");
	res.header("Access-Control-Allow-Origin", "*");
	res.send("test");
});

app.listen(3000);
