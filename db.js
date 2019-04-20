let alimentoArray = [];
let alimentoCounter = 0;

function newAlimentoId() {
  let id = alimentoCounter;
  alimentoCounter++;
  return id.toString();
}

module.exports = {
  addAlimento: function(alimento) {
    let id = newAlimentoId();
    alimento.id = id;
    alimentoArray.push(alimento);
    return id;
  },

  updateAlimento: function(alimento) {
    let index = alimentoArray.findIndex((al) => { return al.id == alimento.id; })
    alimentoArray[index] = alimento;
    return alimento.id;
  },

  fetchAlimento: function(id) {
    let index = alimentoArray.findIndex((al) => { return al.id == id; })
    return alimentoArray[index];
  },

  removeAlimento: function(id) {
    let index = alimentoArray.findIndex((al) => { return al.id == id; })
    alimentoArray.splice(index, 1);
    return id;
  },

  removeAllAlimentos: function() {
    let removedIds = [];
    alimentoArray.forEach((alimento) => {removedIds.push(alimento.id.toString()); })
    alimentoArray = [];
    return removedIds;
  },


  fetchAllAlimentos: function() {
    return alimentoArray;
  },
}