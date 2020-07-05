const service = require('./services/parallelum-api');

const types = { CAMINHOES: 'caminhoes', CARROS: 'carros', MOTOS: 'motos' };
module.exports = {
  fetchMarcas: (veiculoType = types.CARROS) => service.fetchMarcas(veiculoType),
  fetchVeiculos: () => { throw 'Not Implemented' },
  fetchModelos: () => { throw 'Not Implemented' },
  fetchAnos: () => { throw 'Not Implemented' },
  fetchDetalhes: () => { throw 'Not Implemented' },
  types
}