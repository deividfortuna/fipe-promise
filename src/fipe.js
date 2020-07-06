import service from './services/parallelum-api';

const types = { TRUCKS: 'caminhoes', CARS: 'carros', MOTORCYCLES: 'motos' };

export { types };
export default (vehicleType = types.CARS) => ({
  fetchBrands: () => service.fetchBrands(vehicleType),
  fetchModels: (brand) => service.fetchModels(vehicleType, brand),
  fetchYears: (brand, model) => { throw 'Not Implemented' },
  fetchDetail: (brand, model, year) => { throw 'Not Implemented' },
  types
});
