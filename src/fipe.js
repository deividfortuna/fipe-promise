'use strict'

import service from './services/parallelum-api'
import types from './vehicle-types';

export default (vehicleType = types.CARS) => ({
  fetchBrands: () => service.fetchBrands(vehicleType),
  fetchModels: (brandId) => service.fetchModels(vehicleType, brandId),
  fetchYears: (brandId, modelId) => service.fetchYears(vehicleType, brandId, modelId),
  fetchDetail: (brandId, modelId, yearId) => service.fetchDetail(vehicleType, brandId, modelId, yearId)
})
