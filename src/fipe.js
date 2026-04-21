'use strict'

import vehicleType from './fipe-types'
import service from './services/parallelum-api'

export default {
  fetchBrands: (type, options) => service.fetchBrands(type, options),
  fetchModels: (type, brandId, options) => service.fetchModels(type, brandId, options),
  fetchYears: (type, brandId, modelId, options) => service.fetchYears(type, brandId, modelId, options),
  fetchDetail: (type, brandId, modelId, yearId, options) => service.fetchDetail(type, brandId, modelId, yearId, options),
  fetchReferences: (options) => service.fetchReferences(options),
  fetchYearsByFipeCode: (type, fipeCode, options) => service.fetchYearsByFipeCode(type, fipeCode, options),
  fetchDetailByFipeCode: (type, fipeCode, yearId, options) => service.fetchDetailByFipeCode(type, fipeCode, yearId, options),
  fetchPriceHistory: (type, fipeCode, yearId, options) => service.fetchPriceHistory(type, fipeCode, yearId, options),
  vehicleType
}
