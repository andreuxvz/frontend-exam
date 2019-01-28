const express = require("express");
const port = process.env.PORT || 8080;
const app = express();

app.use(expres.static(_dirname + "/dist/"));
app.get(/.*/, function() {
	res.sendFile(__dirname + '/dist/index.html');
});
app.listen(port);

console.log('server is running ok');