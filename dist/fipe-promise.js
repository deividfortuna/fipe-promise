(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('isomorphic-unfetch')) :
  typeof define === 'function' && define.amd ? define(['isomorphic-unfetch'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.fipe = factory(global.fetch));
}(this, (function (fetch) { 'use strict';

  fetch = fetch && Object.prototype.hasOwnProperty.call(fetch, 'default') ? fetch['default'] : fetch;

  var vehicleType = {
    TRUCKS: 'trucks',
    CARS: 'cars',
    MOTORCYCLES: 'motorcycles'
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

  var BASE_URL = 'https://fipe.parallelum.com.br/api/v2/';

  var buildRequest = function buildRequest(path) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var headers = {
      'Content-Type': 'application/json'
    };

    if (options.token) {
      headers['X-Subscription-Token'] = options.token;
    }

    var url = options.reference ? "".concat(BASE_URL).concat(path, "?reference=").concat(options.reference) : "".concat(BASE_URL).concat(path);
    return fetch(url, {
      headers: headers
    }).then(parseResponse)["catch"](throwError);
  };

  var fetchBrands = function fetchBrands(vehicleType, options) {
    if (!vehicleType) {
      throwMissingArgument('vehicleType is required');
    }

    return buildRequest("".concat(vehicleType, "/brands"), options);
  };

  var fetchModels = function fetchModels(vehicleType, brandId, options) {
    if (!vehicleType) {
      throwMissingArgument('vehicleType is required');
    }

    if (!brandId) {
      throwMissingArgument('brandId is required');
    }

    return buildRequest("".concat(vehicleType, "/brands/").concat(brandId, "/models"), options);
  };

  var fetchYears = function fetchYears(vehicleType, brandId, modelId, options) {
    if (!vehicleType) {
      throwMissingArgument('vehicleType is required');
    }

    if (!brandId) {
      throwMissingArgument('brandId is required');
    }

    if (!modelId) {
      throwMissingArgument('modelId is required');
    }

    return buildRequest("".concat(vehicleType, "/brands/").concat(brandId, "/models/").concat(modelId, "/years"), options);
  };

  var fetchDetail = function fetchDetail(vehicleType, brandId, modelId, yearId, options) {
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

    return buildRequest("".concat(vehicleType, "/brands/").concat(brandId, "/models/").concat(modelId, "/years/").concat(yearId), options);
  };

  var fetchReferences = function fetchReferences(options) {
    return buildRequest('references', options);
  };

  var fetchYearsByFipeCode = function fetchYearsByFipeCode(vehicleType, fipeCode, options) {
    if (!vehicleType) {
      throwMissingArgument('vehicleType is required');
    }

    if (!fipeCode) {
      throwMissingArgument('fipeCode is required');
    }

    return buildRequest("".concat(vehicleType, "/").concat(fipeCode, "/years"), options);
  };

  var fetchDetailByFipeCode = function fetchDetailByFipeCode(vehicleType, fipeCode, yearId, options) {
    if (!vehicleType) {
      throwMissingArgument('vehicleType is required');
    }

    if (!fipeCode) {
      throwMissingArgument('fipeCode is required');
    }

    if (!yearId) {
      throwMissingArgument('yearId is required');
    }

    return buildRequest("".concat(vehicleType, "/").concat(fipeCode, "/years/").concat(yearId), options);
  };

  var fetchPriceHistory = function fetchPriceHistory(vehicleType, fipeCode, yearId, options) {
    if (!vehicleType) {
      throwMissingArgument('vehicleType is required');
    }

    if (!fipeCode) {
      throwMissingArgument('fipeCode is required');
    }

    if (!yearId) {
      throwMissingArgument('yearId is required');
    }

    return buildRequest("".concat(vehicleType, "/").concat(fipeCode, "/years/").concat(yearId, "/history"), options);
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
    fetchDetail: fetchDetail,
    fetchReferences: fetchReferences,
    fetchYearsByFipeCode: fetchYearsByFipeCode,
    fetchDetailByFipeCode: fetchDetailByFipeCode,
    fetchPriceHistory: fetchPriceHistory
  };

  var fipe = {
    fetchBrands: function fetchBrands(type, options) {
      return service.fetchBrands(type, options);
    },
    fetchModels: function fetchModels(type, brandId, options) {
      return service.fetchModels(type, brandId, options);
    },
    fetchYears: function fetchYears(type, brandId, modelId, options) {
      return service.fetchYears(type, brandId, modelId, options);
    },
    fetchDetail: function fetchDetail(type, brandId, modelId, yearId, options) {
      return service.fetchDetail(type, brandId, modelId, yearId, options);
    },
    fetchReferences: function fetchReferences(options) {
      return service.fetchReferences(options);
    },
    fetchYearsByFipeCode: function fetchYearsByFipeCode(type, fipeCode, options) {
      return service.fetchYearsByFipeCode(type, fipeCode, options);
    },
    fetchDetailByFipeCode: function fetchDetailByFipeCode(type, fipeCode, yearId, options) {
      return service.fetchDetailByFipeCode(type, fipeCode, yearId, options);
    },
    fetchPriceHistory: function fetchPriceHistory(type, fipeCode, yearId, options) {
      return service.fetchPriceHistory(type, fipeCode, yearId, options);
    },
    vehicleType: vehicleType
  };

  return fipe;

})));
