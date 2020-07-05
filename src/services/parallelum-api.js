'use strict'

const fetch = require('isomorphic-unfetch');
const BASE_URL = 'https://parallelum.com.br/fipe/api/v1/';

const fetchBrands = (vehicleType) => {
  const url = `${BASE_URL}${vehicleType}/marcas`;
  const options = {
    headers: { 'Content-Type': 'application/json', 'cache-control': 'no-cache' }
  };

  return fetch(url, options)
    .then(parseResponse);
};

function parseResponse(response) {
  if (response.ok) {
    return response.text();
  }

  throw 'Not implemented';
}

module.exports = { fetchBrands };