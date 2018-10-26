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

app.post("/opt", (req, res, next) => {
  let parsed = util.getGlpkFormatt(req.body);
  let optm = glpk.solve(parsed, glpk.GPL_MSG_ALL);
  let parsedBack = util.getFoodWasteFormat(optm);
  res.send(parsedBack);
});