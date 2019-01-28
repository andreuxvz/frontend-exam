const express = require("express");
const port = process.env.PORT || 8080;
const app = express();

app.use(express.static(__dirname + '/../dist/'));
app.get(/.*/, function(req, res) {
	var path = require("path");
	res.sendFile(path.resolve(__dirname + '/../dist/index.html'));
});
app.listen(port);

console.log('server is running ok', __dirname + '../dist/');