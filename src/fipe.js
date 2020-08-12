'use strict'

import vehicleType from './fipe-types';
import service from './services/parallelum-api'

export default {
  fetchBrands: (type) => service.fetchBrands(type),
  fetchModels: (type, brandId) => service.fetchModels(type, brandId),
  fetchYears: (type, brandId, modelId) => service.fetchYears(type, brandId, modelId),
  fetchDetail: (type, brandId, modelId, yearId) => service.fetchDetail(type, brandId, modelId, yearId),
  vehicleType
};
