const express = require("express");
const port = process.env.PORT || 8080;
const app = express();


const jsonServer = require('json-server');
const server = jsonServer.create();
const middlewares = jsonServer.defaults();
const portJson = process.env.PORT || 3000;
server.use(middlewares)
//const port = process.env.PORT || 3000;

app.use(express.static(__dirname + '/../dist/'));
app.get(/.*/, function(req, res) {
	console.log(req, 'requestwqkrowerwe wqernwrmwer')
	var path = require("path");
	res.sendFile(path.resolve(__dirname + '/../dist/index.html'));
});

module.exports = (req, res, next) => {
  if (req.method === 'POST' && req.path === '/login/') {
    if (req.body.email === 'admin@vue.com' && req.body.password === 'secret') {
      res.status(200).json({
        message: 'successful login'
      })
    } else {
      res.status(400).json({
        message: 'wrong password',
        data: req.body
      })
    }
  } else {
    next();
  }
}


server.listen(portJson);
app.listen(port);
console.log('server is running ok', __dirname + '../dist/');