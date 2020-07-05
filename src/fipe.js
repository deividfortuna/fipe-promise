const service = require('./services/parallelum-api');

const types = { TRUCKS: 'caminhoes', CARS: 'carros', MOTORCYCLES: 'motos' };
module.exports = {
  fetchBrands: (vehicleType = types.CARS) => service.fetchBrands(vehicleType),
  fetchVeiculos: () => { throw 'Not Implemented' },
  fetchModels: () => { throw 'Not Implemented' },
  fetchYears: () => { throw 'Not Implemented' },
  fetchDetail: () => { throw 'Not Implemented' },
  types
}