var express = require("express");
var glpk = require("./node_modules/glpk.js");
var util = require("./util.js");
var data = require("./data.js");
var bodyParser = require('body-parser');
var app = express();
app.use(bodyParser.json());

var port = 3000;

app.listen(port, () => {
  console.log("Server running on port " + port);
});

app.post("/qt", (req, res, next) => {
  console.log("running opt get");

});

app.post("/opt", (req, res, next) => {
  console.log(req.body);
  console.log("parse:\n"); 
  let parsed = util.getGlpkFormat(req.body);
  console.log("running opt post"); 
  let optm = glpk.solve(parsed, glpk.GPL_MSG_ALL);
  console.log("running opt post"); 
  let parsedBack = util.getFoodWasteFormat(req.body, optm);
  console.log(parsedBack);
  res.send(parsedBack);
});