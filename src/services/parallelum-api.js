'use strict'

import fetch from 'isomorphic-unfetch'
import fipePromiseError from './../error'

const BASE_URL = 'https://fipe.parallelum.com.br/api/v2/'

const buildRequest = (path, options = {}) => {
  const headers = { 'Content-Type': 'application/json' }
  if (options.token) {
    headers['X-Subscription-Token'] = options.token
  }

  const url = options.reference
    ? `${BASE_URL}${path}?reference=${options.reference}`
    : `${BASE_URL}${path}`

  return fetch(url, { headers }).then(parseResponse).catch(throwError)
}

const fetchBrands = (vehicleType, options) => {
  if (!vehicleType) { throwMissingArgument('vehicleType is required') }

  return buildRequest(`${vehicleType}/brands`, options)
}

const fetchModels = (vehicleType, brandId, options) => {
  if (!vehicleType) { throwMissingArgument('vehicleType is required') }
  if (!brandId) { throwMissingArgument('brandId is required') }

  return buildRequest(`${vehicleType}/brands/${brandId}/models`, options)
}

const fetchYears = (vehicleType, brandId, modelId, options) => {
  if (!vehicleType) { throwMissingArgument('vehicleType is required') }
  if (!brandId) { throwMissingArgument('brandId is required') }
  if (!modelId) { throwMissingArgument('modelId is required') }

  return buildRequest(`${vehicleType}/brands/${brandId}/models/${modelId}/years`, options)
}

const fetchDetail = (vehicleType, brandId, modelId, yearId, options) => {
  if (!vehicleType) { throwMissingArgument('vehicleType is required') }
  if (!brandId) { throwMissingArgument('brandId is required') }
  if (!modelId) { throwMissingArgument('modelId is required') }
  if (!yearId) { throwMissingArgument('yearId is required') }

  return buildRequest(`${vehicleType}/brands/${brandId}/models/${modelId}/years/${yearId}`, options)
}

const fetchReferences = (options) => {
  return buildRequest('references', options)
}

const fetchYearsByFipeCode = (vehicleType, fipeCode, options) => {
  if (!vehicleType) { throwMissingArgument('vehicleType is required') }
  if (!fipeCode) { throwMissingArgument('fipeCode is required') }

  return buildRequest(`${vehicleType}/${fipeCode}/years`, options)
}

const fetchDetailByFipeCode = (vehicleType, fipeCode, yearId, options) => {
  if (!vehicleType) { throwMissingArgument('vehicleType is required') }
  if (!fipeCode) { throwMissingArgument('fipeCode is required') }
  if (!yearId) { throwMissingArgument('yearId is required') }

  return buildRequest(`${vehicleType}/${fipeCode}/years/${yearId}`, options)
}

const fetchPriceHistory = (vehicleType, fipeCode, yearId, options) => {
  if (!vehicleType) { throwMissingArgument('vehicleType is required') }
  if (!fipeCode) { throwMissingArgument('fipeCode is required') }
  if (!yearId) { throwMissingArgument('yearId is required') }

  return buildRequest(`${vehicleType}/${fipeCode}/years/${yearId}/history`, options)
}

const parseResponse = response => {
  if (response.ok) {
    return response.json()
  }
  throw fipePromiseError({
    message: 'Connection Error with parallelum.com.br',
    errors: [{
      url: response.url,
      status: response.status,
      statusText: response.statusText
    }]
  })
}

const throwError = (error) => {
  throw fipePromiseError(error)
}

const throwMissingArgument = (message) => {
  throw fipePromiseError({ message, type: 'MISSING_ARGUMENTS' })
}

export default {
  fetchBrands,
  fetchModels,
  fetchYears,
  fetchDetail,
  fetchReferences,
  fetchYearsByFipeCode,
  fetchDetailByFipeCode,
  fetchPriceHistory
}
