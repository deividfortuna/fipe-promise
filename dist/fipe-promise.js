(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('isomorphic-unfetch')) :
  typeof define === 'function' && define.amd ? define(['isomorphic-unfetch'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.fipe = factory(global.fetch));
}(this, (function (fetch) { 'use strict';

  fetch = fetch && Object.prototype.hasOwnProperty.call(fetch, 'default') ? fetch['default'] : fetch;

  var vehicleType = {
    TRUCKS: 'caminhoes',
    CARS: 'carros',
    MOTORCYCLES: 'motos'
  };

  var fipePromiseError = (function () {
    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        message = _ref.message,
        type = _ref.type,
        errors = _ref.errors;

    return {
      name: 'FipePromiseError',
      message: message,
      type: type,
      errors: errors
    };
  });

  var BASE_URL = 'https://parallelum.com.br/fipe/api/v1/';
  var headers = {
    'Content-Type': 'application/json',
    'cache-control': 'no-cache'
  };

  var fetchBrands = function fetchBrands(vehicleType) {
    if (!vehicleType) {
      throwMissingArgument('vehicleType is required');
    }

    var url = "".concat(BASE_URL).concat(vehicleType, "/marcas");
    var options = {
      headers: headers
    };
    return fetch(url, options).then(parseResponse)["catch"](throwError);
  };

  var fetchModels = function fetchModels(vehicleType, brandId) {
    if (!vehicleType) {
      throwMissingArgument('vehicleType is required');
    }

    if (!brandId) {
      throwMissingArgument('brandId is required');
    }

    var url = "".concat(BASE_URL).concat(vehicleType, "/marcas/").concat(brandId, "/modelos");
    var options = {
      headers: headers
    };
    return fetch(url, options).then(parseResponse).then(function (response) {
      return response.modelos;
    })["catch"](throwError);
  };

  var fetchYears = function fetchYears(vehicleType, brandId, modelId) {
    if (!vehicleType) {
      throwMissingArgument('vehicleType is required');
    }

    if (!brandId) {
      throwMissingArgument('brandId is required');
    }

    if (!modelId) {
      throwMissingArgument('modelId is required');
    }

    var url = "".concat(BASE_URL).concat(vehicleType, "/marcas/").concat(brandId, "/modelos/").concat(modelId, "/anos");
    var options = {
      headers: headers
    };
    return fetch(url, options).then(parseResponse)["catch"](throwError);
  };

  var fetchDetail = function fetchDetail(vehicleType, brandId, modelId, yearId) {
    if (!vehicleType) {
      throwMissingArgument('vehicleType is required');
    }

    if (!brandId) {
      throwMissingArgument('brandId is required');
    }

    if (!modelId) {
      throwMissingArgument('modelId is required');
    }

    if (!yearId) {
      throwMissingArgument('yearId is required');
    }

    var url = "".concat(BASE_URL).concat(vehicleType, "/marcas/").concat(brandId, "/modelos/").concat(modelId, "/anos/").concat(yearId);
    var options = {
      headers: headers
    };
    return fetch(url, options).then(parseResponse)["catch"](throwError);
  };

  var parseResponse = function parseResponse(response) {
    if (response.ok) {
      return response.json();
    }

    throw fipePromiseError({
      message: 'Connection Error with parallelum.com.br',
      errors: [{
        url: response.url,
        status: response.status,
        statusText: response.statusText
      }]
    });
  };

  var throwError = function throwError(error) {
    throw fipePromiseError(error);
  };

  var throwMissingArgument = function throwMissingArgument(message) {
    throw fipePromiseError({
      message: message,
      type: 'MISSING_ARGUMENTS'
    });
  };

  var service = {
    fetchBrands: fetchBrands,
    fetchModels: fetchModels,
    fetchYears: fetchYears,
    fetchDetail: fetchDetail
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
