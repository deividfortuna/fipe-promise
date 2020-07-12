'use strict'

import service from './services/parallelum-api'

const vehicleType = { TRUCKS: 'caminhoes', CARS: 'carros', MOTORCYCLES: 'motos' }

export default {
  fetchBrands: (type) => service.fetchBrands(type),
  fetchModels: (type, brandId) => service.fetchModels(type, brandId),
  fetchYears: (type, brandId, modelId) => service.fetchYears(type, brandId, modelId),
  fetchDetail: (type, brandId, modelId, yearId) => service.fetchDetail(type, brandId, modelId, yearId),
  vehicleType
};
