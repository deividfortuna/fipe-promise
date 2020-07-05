'use strict'

const fetch = require('isomorphic-unfetch');
const BASE_URL = 'https://parallelum.com.br/fipe/api/v1/';

const fetchMarcas = (veiculoType) => {
    const url = `${BASE_URL}${veiculoType}/marcas`;
    const options = {

    };

    return fetch(url, options);
};

module.exports = { fetchMarcas };