'use strict'

import fetch from 'isomorphic-unfetch';

const BASE_URL = 'https://parallelum.com.br/fipe/api/v1/';
const headers = { 'Content-Type': 'application/json', 'cache-control': 'no-cache' };

const fetchBrands = (vehicleType) => {
  const url = `${BASE_URL}${vehicleType}/marcas`;
  const options = { headers };

  return fetch(url, options).then(parseResponse);
};

const fetchModels = (vehicleType, brand) => {
  const url = `${BASE_URL}${vehicleType}/marcas/${brand}/modelos`;
  const options = { headers };

  return fetch(url, options).then(parseResponse)
    .then(response => response.modelos);
}

function parseResponse(response) {
  if (response.ok) {
    return response.text();
  }

  throw 'Not implemented';
}

export default { fetchBrands, fetchModels };
