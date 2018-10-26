var glpk = require("./node_modules/glpk.js");

function getVars(json) {
  let vars = [];
  let jsonKeys = Object.keys(json);
  for (let key of jsonKeys) {
    let item = { 
      name: key,
      coef: json[key]
    }
    vars.push(item);
  }
  return vars;
}

function getObjective(json) {
  var objective = {
    direction: glpk.GLP_MAX,
    name: 'objetiva',
    vars: getVars(json)
  };
  return objective;
}

function getBounds(max) {
  let bnds = {
    type: glpk.GLP_UP,
    ub: max,
    lb: 0.0,
  };
  return bnds;
}

function getSubjectTo(json) {
  var subjectTo = [];
  let jsonKeys = Object.keys(json); 
  for (let key of jsonKeys) {
    let value = json[key];
    let item = {
      name: key,
      vars: getVars(value.receitas), 
      bnds: getBounds(value.max), 
    }
    subjectTo.push(item);
  }
  return subjectTo;
}

module.exports = {
  getGlpkFormatt: function(json) {
    let result = {
      name: 'Food Waste',
      objective: getObjective(json.objetiva),
      subjectTo: getSubjectTo(json.restricoes),
    }
    return result;
  },

  getFoodWasteFormat: function(json) {
    let result = {
      tempo: json.time,
      quantidades: json.result.vars,
      lucro: json.result.z,
      status: json.result.status 
    };
    return result;
  }
}