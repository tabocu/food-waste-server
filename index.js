var express = require("express");
var glpk = require("./node_modules/glpk.js");
var util = require("./util.js");
var bodyParser = require('body-parser');
var app = express();
app.use(bodyParser.json());

var port = 3000;

let lpFW = {
  objetiva: { 
    "Receita A": 0.6, 
    "Receita B": 0.5
  },
  restricoes: {
    "Alimento 1": {
      receitas: {
        "Receita A": 1.0,
        "Receita B": 2.0
      },
      max: 10
    },
    "Alimento 2": {
      receitas: {
        "Receita A": 3.0,
        "Receita B": 1.0 
      },
      max: 20
    }
  }
}

var res = {
  name: "Food Waste",
  time: 0.116,
  result: {
    vars: {
      "Receita A": 0.6,
      "Receita B": 0.2
    },
    z: 0.45999999999999996,
    status: 5
  }
}

let lp = {
  name: 'Food Waste',
  objective: {
    direction: glpk.GLP_MAX,
    name: 'obj',
    vars: [
      { name: 'Receita A', coef: 0.6 },
      { name: 'Receita B', coef: 0.5 }
    ]
  },
  subjectTo: [
    {
      name: 'Alimento 1',
      vars: [
        { name: 'Receita A', coef: 1.0 },
        { name: 'Receita B', coef: 2.0 }
      ],
      bnds: { type: glpk.GLP_UP, ub: 1.0, lb: 0.0 }
    },
    {
      name: 'Alimento 2',
      vars: [
        { name: 'Receita A', coef: 3.0 },
        { name: 'Receita B', coef: 1.0 }
      ],
      bnds: { type: glpk.GLP_UP, ub: 2.0, lb: 0.0 }
    }
  ]
};

app.get("/url", (req, res, next) => {
  res.send(req.body);
});

app.post("/in_parser", (req, res, next) => {
  res.send(util.getGlpkFormatt(lpFW));
});

app.post("/out_parser", (req, res, next) => {
  res.send(util.getFoodWasteFormat(res));
});

app.post("/opt", (req, res, next) => {
  let parsed = util.getGlpkFormatt(req.body);
  let optm = glpk.solve(parsed, glpk.GPL_MSG_ALL);
  let parsedBack = util.getFoodWasteFormat(optm);
  res.send(parsedBack);
});