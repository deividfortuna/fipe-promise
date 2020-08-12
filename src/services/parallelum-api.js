'use strict'

import fetch from 'isomorphic-unfetch'
import fipePromiseError from './../error';

const BASE_URL = 'https://parallelum.com.br/fipe/api/v1/'
const headers = { 'Content-Type': 'application/json', 'cache-control': 'no-cache' }

const fetchBrands = (vehicleType) => {
  if (!vehicleType) { throwMissingArgument('vehicleType is required') }

  const url = `${BASE_URL}${vehicleType}/marcas`
  const options = { headers }

  return fetch(url, options).then(parseResponse).catch(throwError)
}

const fetchModels = (vehicleType, brandId) => {
  if (!vehicleType) { throwMissingArgument('vehicleType is required') }
  if (!brandId) { throwMissingArgument('brandId is required') }

  const url = `${BASE_URL}${vehicleType}/marcas/${brandId}/modelos`
  const options = { headers }

  return fetch(url, options).then(parseResponse)
    .then(response => response.modelos).catch(throwError)
}

const fetchYears = (vehicleType, brandId, modelId) => {
  if (!vehicleType) { throwMissingArgument('vehicleType is required') }
  if (!brandId) { throwMissingArgument('brandId is required') }
  if (!modelId) { throwMissingArgument('modelId is required') }

  const url = `${BASE_URL}${vehicleType}/marcas/${brandId}/modelos/${modelId}/anos`
  const options = { headers }

  return fetch(url, options).then(parseResponse).catch(throwError)
}

const fetchDetail = (vehicleType, brandId, modelId, yearId) => {
  if (!vehicleType) { throwMissingArgument('vehicleType is required') }
  if (!brandId) { throwMissingArgument('brandId is required') }
  if (!modelId) { throwMissingArgument('modelId is required') }
  if (!yearId) { throwMissingArgument('yearId is required') }

  const url = `${BASE_URL}${vehicleType}/marcas/${brandId}/modelos/${modelId}/anos/${yearId}`
  const options = { headers }

  return fetch(url, options).then(parseResponse).catch(throwError)
}

const parseResponse = response => {
  if (response.ok) {
    return response.json()
  }
  throw fipePromiseError({
    message: 'Connection Error with parallelum.com.br', errors: [{
      url: response.url,
      status: response.status,
      statusText: response.statusText
    }]
  });
}

const throwError = (error) => {
  throw fipePromiseError(error)
}

const throwMissingArgument = (message) => {
  throw fipePromiseError({ message, type: 'MISSING_ARGUMENTS' });
}

export default { fetchBrands, fetchModels, fetchYears, fetchDetail }
