const express = require("express");
const app = express();
const PORT = 3000;

app.get("/", (req, res) => {
	console.log("home");
	res.send("Hello World");
});

app.post("/upload", (req, res) => {
	res.header("Access-Control-Allow-Origin", "*");
	const reason = req.query.reason;
	res.send(reason);
});

app.listen(PORT);
console.log(`listening on Port ${PORT}`);
