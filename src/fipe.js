'use strict'

import service from './services/parallelum-api';

const types = { TRUCKS: 'caminhoes', CARS: 'carros', MOTORCYCLES: 'motos' };

export { types };
export default (vehicleType = types.CARS) => ({
  fetchBrands: () => service.fetchBrands(vehicleType),
  fetchModels: (brandId) => service.fetchModels(vehicleType, brandId),
  fetchYears: (brandId, modelId) => service.fetchYears(vehicleType, brandId, modelId),
  fetchDetail: (brandId, modelId, yearId) => { throw 'Not Implemented' }
});
