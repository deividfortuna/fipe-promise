'use strict'

import fetch from 'isomorphic-unfetch'

const BASE_URL = 'https://parallelum.com.br/fipe/api/v1/'
const headers = { 'Content-Type': 'application/json', 'cache-control': 'no-cache' }

const fetchBrands = (vehicleType) => {
  if (!vehicleType) { throw 'vehicleType is required' };

  const url = `${BASE_URL}${vehicleType}/marcas`
  const options = { headers }

  return fetch(url, options).then(parseResponse)
}

const fetchModels = (vehicleType, brandId) => {
  if (!vehicleType) { throw 'vehicleType is required' };
  if (!brandId) { throw 'brandId is required' };

  const url = `${BASE_URL}${vehicleType}/marcas/${brandId}/modelos`
  const options = { headers }

  return fetch(url, options).then(parseResponse)
    .then(response => response.modelos)
}

const fetchYears = (vehicleType, brandId, modelId) => {
  if (!vehicleType) { throw 'vehicleType is required' };
  if (!brandId) { throw 'brandId is required' };
  if (!modelId) { throw 'modelId is required' };

  const url = `${BASE_URL}${vehicleType}/marcas/${brandId}/modelos/${modelId}/anos`
  const options = { headers }

  return fetch(url, options).then(parseResponse)
}

const fetchDetail = (vehicleType, brandId, modelId, yearId) => {
if (!vehicleType) { throw 'vehicleType is required' };
  if (!brandId) { throw 'brandId is required' };
  if (!modelId) { throw 'modelId is required' };

  const url = `${BASE_URL}${vehicleType}/marcas/${brandId}/modelos/${modelId}/anos/${yearId}`
  const options = { headers }

  return fetch(url, options).then(parseResponse)
}

function parseResponse (response) {
  if (response.ok) {
    return response.text()
  }

  throw 'Not implemented'
}

export default { fetchBrands, fetchModels, fetchYears, fetchDetail }
