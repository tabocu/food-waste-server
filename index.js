var express = require("express");
var glpk = require("./node_modules/glpk.js");
var util = require("./util.js");
var data = require("./data.js");
var db = require("./db.js");
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



app.put("/data/*", (req, res) => {
  console.log(req.body);
  console.log(req.path);
  var pathVec = req.path.split('/');
  let resource = pathVec[pathVec.length-1];

  if (resource == "alimento") {
    let id;
    if (req.body.id == -1) {
      id = db.addAlimento(req.body);
    } else {
      id = db.updateAlimento(req.body);
    }
    res.send(id.toString());
  }
});

app.delete("/data/*", (req, res) => {
  var pathVec = req.path.split('/');
  let resource = pathVec[pathVec.length-1];

  if (resource == "alimento") {
    let id = req.query.id;      

    if (typeof id === 'undefined') {
      res.send(db.removeAllAlimentos())
    } else {
      res.send(db.removeAlimento(id));
    }
  }
});

app.get("/data/*", (req, res) => {
  var pathVec = req.path.split('/');
  let resource = pathVec[pathVec.length-1];

  if (resource == "alimento") {
    let id = req.query.id; 
    if (typeof id === 'undefined') {
      res.send(db.fetchAllAlimentos())
    } else {
      res.send(db.fetchAlimento(id));
    }
  }
});