(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('isomorphic-unfetch')) :
  typeof define === 'function' && define.amd ? define(['isomorphic-unfetch'], factory) :
  (global = global || self, global.fipe = factory(global.fetch));
}(this, (function (fetch) { 'use strict';

  fetch = fetch && Object.prototype.hasOwnProperty.call(fetch, 'default') ? fetch['default'] : fetch;

  var BASE_URL = 'https://parallelum.com.br/fipe/api/v1/';
  var headers = {
    'Content-Type': 'application/json',
    'cache-control': 'no-cache'
  };

  var fetchBrands = function fetchBrands(vehicleType) {
    if (!vehicleType) {
      throw 'vehicleType is required';
    }
    var url = "".concat(BASE_URL).concat(vehicleType, "/marcas");
    var options = {
      headers: headers
    };
    return fetch(url, options).then(parseResponse);
  };

  var fetchModels = function fetchModels(vehicleType, brandId) {
    if (!vehicleType) {
      throw 'vehicleType is required';
    }

    if (!brandId) {
      throw 'brandId is required';
    }
    var url = "".concat(BASE_URL).concat(vehicleType, "/marcas/").concat(brandId, "/modelos");
    var options = {
      headers: headers
    };
    return fetch(url, options).then(parseResponse).then(function (response) {
      return response.modelos;
    });
  };

  var fetchYears = function fetchYears(vehicleType, brandId, modelId) {
    if (!vehicleType) {
      throw 'vehicleType is required';
    }

    if (!brandId) {
      throw 'brandId is required';
    }

    if (!modelId) {
      throw 'modelId is required';
    }
    var url = "".concat(BASE_URL).concat(vehicleType, "/marcas/").concat(brandId, "/modelos/").concat(modelId, "/anos");
    var options = {
      headers: headers
    };
    return fetch(url, options).then(parseResponse);
  };

  var fetchDetail = function fetchDetail(vehicleType, brandId, modelId, yearId) {
    if (!vehicleType) {
      throw 'vehicleType is required';
    }

    if (!brandId) {
      throw 'brandId is required';
    }

    if (!modelId) {
      throw 'modelId is required';
    }
    var url = "".concat(BASE_URL).concat(vehicleType, "/marcas/").concat(brandId, "/modelos/").concat(modelId, "/anos/").concat(yearId);
    var options = {
      headers: headers
    };
    return fetch(url, options).then(parseResponse);
  };

  function parseResponse(response) {
    if (response.ok) {
      return response.text();
    }

    throw 'Not implemented';
  }

  var service = {
    fetchBrands: fetchBrands,
    fetchModels: fetchModels,
    fetchYears: fetchYears,
    fetchDetail: fetchDetail
  };

  var vehicleType = {
    TRUCKS: 'caminhoes',
    CARS: 'carros',
    MOTORCYCLES: 'motos'
  };
  var fipe = {
    fetchBrands: function fetchBrands(type) {
      return service.fetchBrands(type);
    },
    fetchModels: function fetchModels(type, brandId) {
      return service.fetchModels(type, brandId);
    },
    fetchYears: function fetchYears(type, brandId, modelId) {
      return service.fetchYears(type, brandId, modelId);
    },
    fetchDetail: function fetchDetail(type, brandId, modelId, yearId) {
      return service.fetchDetail(type, brandId, modelId, yearId);
    },
    vehicleType: vehicleType
  };

  return fipe;

})));
