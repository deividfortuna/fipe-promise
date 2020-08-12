(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.fipe = factory());
}(this, (function () { 'use strict';

	var vehicleType = {
	  TRUCKS: 'caminhoes',
	  CARS: 'carros',
	  MOTORCYCLES: 'motos'
	};

	function unfetch (e, n) {
	  return n = n || {}, new Promise(function (t, r) {
	    var s = new XMLHttpRequest(),
	        o = [],
	        u = [],
	        i = {},
	        a = function a() {
	      return {
	        ok: 2 == (s.status / 100 | 0),
	        statusText: s.statusText,
	        status: s.status,
	        url: s.responseURL,
	        text: function text() {
	          return Promise.resolve(s.responseText);
	        },
	        json: function json() {
	          return Promise.resolve(JSON.parse(s.responseText));
	        },
	        blob: function blob() {
	          return Promise.resolve(new Blob([s.response]));
	        },
	        clone: a,
	        headers: {
	          keys: function keys() {
	            return o;
	          },
	          entries: function entries() {
	            return u;
	          },
	          get: function get(e) {
	            return i[e.toLowerCase()];
	          },
	          has: function has(e) {
	            return e.toLowerCase() in i;
	          }
	        }
	      };
	    };

	    for (var l in s.open(n.method || "get", e, !0), s.onload = function () {
	      s.getAllResponseHeaders().replace(/^(.*?):[^\S\n]*([\s\S]*?)$/gm, function (e, n, t) {
	        o.push(n = n.toLowerCase()), u.push([n, t]), i[n] = i[n] ? i[n] + "," + t : t;
	      }), t(a());
	    }, s.onerror = r, s.withCredentials = "include" == n.credentials, n.headers) {
	      s.setRequestHeader(l, n.headers[l]);
	    }

	    s.send(n.body || null);
	  });
	}

	var unfetch$1 = /*#__PURE__*/Object.freeze({
		__proto__: null,
		'default': unfetch
	});

	function getCjsExportFromNamespace (n) {
		return n && n['default'] || n;
	}

	var require$$0 = getCjsExportFromNamespace(unfetch$1);

	var browser = window.fetch || (window.fetch = require$$0["default"] || require$$0);

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
	  return browser(url, options).then(parseResponse)["catch"](throwError);
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
	  return browser(url, options).then(parseResponse).then(function (response) {
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
	  return browser(url, options).then(parseResponse)["catch"](throwError);
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
	  return browser(url, options).then(parseResponse)["catch"](throwError);
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
