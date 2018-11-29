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

function getSobras(jsonInputFW, jsonOutputGlpk) {
  var sobras = {};

  var receitas = jsonOutputGlpk.result.vars;
  var receitasKeys = Object.keys(receitas);

  var alimentos = jsonInputFW.restricoes;
  var alimentosKeys = Object.keys(alimentos);
  
  for (let alimentoKey of alimentosKeys) {
    let alimento = alimentos[alimentoKey];

    var sobra = alimento.max;

    for (let receitaKey of receitasKeys) {
      let receitaQnt = receitas[receitaKey];
      if (receitaKey in alimento.receitas) {
        //sobras[receitaKey] = alimento.receitas[receitaKey] * receitaQnt;
        sobra -= alimento.receitas[receitaKey] * receitaQnt;
      }
    }
    sobras[alimentoKey] = sobra; 
    console.log(alimentoKey + ": " + sobra);
  }  

  return sobras;
}

module.exports = {
  getGlpkFormat: function(json) {
    let result = {
      name: 'Food Waste',
      objective: getObjective(json.objetiva),
      subjectTo: getSubjectTo(json.restricoes),
      generals: Object.keys(json.objetiva),
    }
    return result;
  },

  getFoodWasteFormat: function (jsonInputFW, jsonOutputGlpk) {
    let result = {
      tempo: jsonOutputGlpk.time,
      quantidades: jsonOutputGlpk.result.vars,
      lucro: jsonOutputGlpk.result.z,
      sobras: getSobras(jsonInputFW, jsonOutputGlpk),
      status: jsonOutputGlpk.result.status 
    };
    return result;
  }
}