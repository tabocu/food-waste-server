var glpk = require("./node_modules/glpk.js");

let FW_OUT = {
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

let FW_IN = {
  name: 'Food Waste',
  time: 0.153,
  result:
  {
    vars:
    {
      "Receita A": 6.428571428571428,
      "Receita B": 0.7142857142857144
    },
    z: 4.2142857142857135,
    status: 5
  }
}

var GLPK_OUT = {
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

let GLPK_IN = {
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
      bnds: { type: glpk.GLP_UP, ub: 10.0, lb: 0.0 }
    },
    {
      name: 'Alimento 2',
      vars: [
        { name: 'Receita A', coef: 3.0 },
        { name: 'Receita B', coef: 1.5 }
      ],
      bnds: { type: glpk.GLP_UP, ub: 20.0, lb: 0.0 }
    }
  ],
  generals: ['Receita A', 'Receita B']
};

module.exports = {
  getGLPK_IN: function() {
    return GLPK_IN;
  },

  getFW_OUT: function() {
    return FW_OUT;
  },

  getGLPK_OUT: function () {
    return GLPK_OUT;
  },

  getFW_IN: function () {
    return FW_IN;
  },
}