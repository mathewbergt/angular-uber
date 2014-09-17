(function() {
  'use strict';

  angular
    .module('mbergt.uber', [])
    .factory('mbUber', mbUber);

  mbUber.$inject = ['$q', '$http'];

  function mbUber($q, $http) {

   /**
    * The angular-uber factory service. A configuration object can be passed,
    * though is not required on initialization. Al Uber API endpoints
    * require either a Server token or Bearer token. These values can be set within
    * your app using setter methods.
    * @param {object} config - The configuration object
    * @param {string} config.baseUrl - The base URL to the Uber API. Defaults to https://api.uber.com.
    * @param {string} config.version - The version of Uber API to use. Defaults to /v1/.
    * @param {string} config.serverToken - The server token from your Uber API app's configuration page.
    * @param {string} config.bearerToken - An OAuth2.0 Bearer token obtained from https://login.uber.com/oauth/token. Setting this value overrides the serverToken on all calls to API endpoints.
    * @param {boolean} config.sandbox - Indicates whether to use the sandbox version of Uber API. Defaults to false.
    * @param {string} config.sandboxBaseUrl - The base URL to the sandbox version of Uber API. Defaults to https://sandbox-api.uber.com.
    * @param {string} config.clientId - The client ID from your Uber API app's configuration page.
    */
    return function uberFactory(config) {
      config = config || {};

      var baseUrl = config.baseUrl || 'https://api.uber.com',
          version = config.version || '/v1/',
          serverToken = config.serverToken,
          bearerToken = config.bearerToken,
          useBearerToken = config.useBearerToken || false,
          sandbox = config.sandbox || false,
          clientId = config.clientId,
          sandboxBaseUrl = config.sandboxBaseUrl || 'https://sandbox-api.uber.com';

      return {
        setBaseUrl: setBaseUrl,
        getBaseUrl: getBaseUrl,
        setVersion: setVersion,
        getVersion: getVersion,
        setServerToken: setServerToken,
        getServerToken: getServerToken,
        setBearerToken: setBearerToken,
        getBearerToken: getBearerToken,
        setUseBearerToken: setUseBearerToken,
        getUseBearerToken: getUseBearerToken,
        setClientId: setClientId,
        getClientId: getClientId,
        setSandbox: setSandbox,
        getSandbox: getSandbox,
        setSandboxBaseUrl: setSandboxBaseUrl,
        getSandboxBaseUrl: getSandboxBaseUrl,
        getProducts: getProducts,
        getProduct: getProduct,
        getPriceEstimates: getPriceEstimates,
        getTimeEstimates: getTimeEstimates,
        getPromotions: getPromotions,
        getHistory: getHistory,
        getUserProfile: getUserProfile,
        makeRequest: makeRequest,
        getRequestDetails: getRequestDetails,
        getRequestEstimate: getRequestEstimate,
        cancelRequest: cancelRequest,
        getRequestMap: getRequestMap,
        getRequestReceipt: getRequestReceipt
      };

     /**
      * Sets the base URL to the Uber API.
      * @constructor
      * @param {string} baseUrl - The base URL to the Uber API.
      */
      function setBaseUrl() {
        baseUrl = arguments[0];
      }

     /**
      * Gets the currently set value for the base URL to the Uber API.
      * @returns {string}
      */
      function getBaseUrl() {
        return baseUrl;
      }

     /**
      * Sets the version of Uber API.
      * @param {string} version - The version of Uber API to use.
      */
      function setVersion() {
        version = arguments[0];
      }

     /**
      * Gets the currently set value for the version of Uber API.
      * @returns {string}
      */
      function getVersion() {
        return version;
      }

     /**
      * Sets the server token which can be found on your Uber API app configuration page.
      * @param {string} serverToken - The server token for your Uber API app.
      */
      function setServerToken() {
        serverToken = arguments[0];
      }

     /**
      * Gets the currently set value of the server token.
      * @returns {string}
      */
      function getServerToken() {
        return serverToken;
      }

     /**
      * Sets the bearer token which is an OAuth2.0 Bearer token obtained from https://login.uber.com/oauth/token.
      * @param {string} bearerToken - The OAuth bearer token obtained from the Uber API.
      */
      function setBearerToken() {
        bearerToken = arguments[0];
      }

     /**
      * Gets the currently set value of the bearer token.
      * @returns {string}
      */
      function getBearerToken() {
        return bearerToken;
      }

     /**
      * Set the service to always use the Bearer token in API calls (instead of the Server token).
      * @param {string} useBearerToken - 
      */
      function setUseBearerToken() {
        useBearerToken = arguments[0];
      }

     /**
      * Indicates whether the bearer token will be used in API calls.
      * @returns {string} - true if Bearer token is used in API calls, false otherwise
      */
      function getUseBearerToken() {
        return useBearerToken;
      }

     /**
      * Sets the client ID which can be found on your Uber API app configuration page.
      * @param {string} clientId - The client ID for your Uber API app.
      */
      function setClientId() {
        clientId = arguments[0];
      }

     /**
      * Gets the currently set value of the client ID.
      * @returns {string}
      */
      function getClientId() {
        return clientId;
      }

     /**
      * Set the uberApiService to use the sandbox version of Uber API.
      * @param {boolean} sandbox - Indicates whether or not to use Uber API sandbox.
      */
      function setSandbox() {
        sandbox = arguments[0];
      }

     /**
      * Gets the currently set value which indicates if the sandbox version of Uber API should be used.
      * @returns {boolean} - true if sandbox is used, false otherwise
      */
      function getSandbox() {
        return sandbox;
      }

     /**
      * Sets the base URL to the sandbox version of Uber API.
      * @param {string} sandboxBaseUrl - The base URL to the sandbox version of Uber API.
      */
      function setSandboxBaseUrl() {
        sandboxBaseUrl = arguments[0];
      }

     /**
      * Gets the currently set value for the base URL to the Uber API sandbox.
      * @returns {string}
      */
      function getSandboxBaseUrl() {
        return sandboxBaseUrl;
      }

     /**
      * Issues a GET request to the /v1/products endpoint. Return data is an object containing an array of products for the specified latitude/longitude. Requires a serverToken or bearerToken to be set.
      * @param {string, float} latitude - Latitude component of location.
      * @param {string, float} longitude - Longitude component of location.
      * @param {string, float} options (optional) - Override options set in the config.
      * @returns {object} - A promise object which resolves a products object on success, and an error object on failure.
      */
      function getProducts(latitude, longitude, options) {
        return api('products', {
          'latitude': latitude,
          'longitude': longitude
        }, options);
      }

     /**
      * Issues a GET request to the /v1/products/{product_id} endpoint. Return data is a product object for the specified productId. Requires a serverToken or bearerToken to be set.
      * @param {string} productId - Latitude component of location.
      * @param {string} options (optional) - Override options set in the config.
      * @returns {object} - A promise object which resolves a product object on success, and an error object on failure.
      */
      function getProduct(productId, options) {
        return api('products/' + productId, null, options);
      }

     /**
      * Issues a GET request to the /v1/estimates/price endpoint. Return data is an object containing an array of price estimates for the specified latitude/longitude range. Requires a serverToken or bearerToken to be set.
      * @param {string, float} startLatitude - Latitude component of start location.
      * @param {string, float} startLongitude - Longitude component of start location.
      * @param {string, float} endLatitude - Latitude component of end location.
      * @param {string, float} endLongitude - Longitude component of end location.
      * @param {object} options (optional) - Override options set in the config.
      * @returns {object} - A promise object which resolves a price estimate object on success, and an error object on failure.
      */
      function getPriceEstimates(startLatitude, startLongitude, endLatitude, endLongitude, options) {
        return api('estimates/price', {
          'start_latitude': startLatitude,
          'start_longitude': startLongitude,
          'end_latitude': endLatitude,
          'end_longitude': endLongitude
        }, options);
      }

     /**
      * Issues a GET request to the /v1/estimates/time endpoint. Return data is an object containing an array of time estimates for the specified latitude/longitude and optional customerUuid and/or productId. Requires a serverToken or bearerToken to be set.
      * @param {string, float} startLatitude - Latitude component.
      * @param {string, float} startLongitude - Longitude component.
      * @param {string, float} customerUuid (optional) - Unique customer identifier to be used for experience customization.
      * @param {string, float} productId (optional) - Unique identifier representing a specific product for a given latitude & longitude.
      * @param {object} options (optional) - Override options set in the config.
      * @returns {object} - A promise object which resolves a time estimate object on success, and an error object on failure.
      */
      function getTimeEstimates(startLatitude, startLongitude, customerUuid, productId, options) {
        return api('estimates/time', {
          'start_latitude': startLatitude,
          'start_longitude': startLongitude,
          'customer_uuid': customerUuid,
          'product_id': productId
        }, options);
      }

     /**
      * Issues a GET request to the /v1/estimates/promotions endpoint. Return data is a promotions object for the specified latitude/longitude range. Requires a serverToken or bearerToken to be set.
      * @param {string, float} startLatitude - Latitude component of start location.
      * @param {string, float} startLongitude - Longitude component of start location.
      * @param {string, float} endLatitude - Latitude component of end location.
      * @param {string, float} endLongitude - Longitude component of end location.
      * @param {object} options (optional) - Override options set in the config.
      * @returns {object} - A promise object which resolves a promotions object on success, and an error object on failure.
      */
      function getPromotions(startLatitude, startLongitude, endLatitude, endLongitude, options) {
        return api('promotions', {
          'start_latitude': startLatitude,
          'start_longitude': startLongitude,
          'end_latitude': endLatitude,
          'end_longitude': endLongitude
        }, options);
      }

     /**
      * Issues a GET request to the /v1.1/history endpoint. Return data is a user activity object for the specified offset and limit. Requires a history_lite scope authorized bearerToken to be set.
      * @param {string, integer} offset - Offset the list of returned results by this amount. Default is zero.
      * @param {string, integer} limit - Number of items to retrieve. Default is 5, maximum is 50.
      * @param {object} options (optional) - Override options set in the config.
      * @returns {object} - A promise object which resolves a user history object on success, and an error object on failure.
      */
      function getHistory(offset, limit, options) {
        return api('history', {
          'offset': offset,
          'limit': limit
        }, options, {
          'version': '/v1.2/',
          'isBearerEndpoint': true
        });
      }

     /**
      * Issues a GET request to the /v1/me endpoint. Return data is a user profile object based on the currently set bearerToken. Requires a profile scope authorized bearerToken to be set.
      * @param {object} options (optional) - Override options set in the config.
      * @returns {object} - A promise object which resolves a user profile object on success, and an error object on failure.
      */
      function getUserProfile(options) {
        return api('me', null, options, {
          'isBearerEndpoint': true
        });
      }

     /**
      * Issues a POST request to the /v1/requests endpoint. Return data is a request object for the specified productId, latitude/longitude range, and optional surgeConfirmationId. Requires a request scope authorized bearerToken to be set.
      * @param {string} productId - The unique ID of the product being requested.
      * @param {string} startLongitude - The beginning or "pickup" latitude.
      * @param {string} startLongitude - The beginning or "pickup" longitude.
      * @param {string} endLatitude - The final or destination latitude.
      * @param {string} endLongitude - The final or destination longitude.
      * @param {string} surgeConfirmationId (optional) - The unique identifier of the surge session for a user. Required when returned from a 409 Conflict response on previous POST attempt.
      * @param {string} options (optional) - Override options set in the config.
      * @returns {object} - A promise object which resolves a request object on success, and an error object on failure.
      */
      function makeRequest(productId, startLatitude, startLongitude, endLatitude, endLongitude, surgeConfirmationId, options) {
        return api('requests', null, options, {
          'isBearerEndpoint': true,
          'method': 'POST',
          'data': {
            'product_id': productId,
            'start_latitude': startLatitude,
            'start_longitude': startLongitude,
            'end_latitude': endLatitude,
            'end_longitude': endLongitude,
            'surge_confirmation_id': surgeConfirmationId
          }
        });
      }

     /**
      * Issues a GET request to the /v1/requests/{request_id} endpoint and returns a request details object based on the specified requestId. Requires a request scope authorized bearerToken to be set.
      * @param {string} requestId - Unique identifier representing a Request.
      * @param {object} options (optional) - Override options set in the config.
      * @returns {object} - A promise object which resolves a request details object on success, and an error object on failure.
      */
      function getRequestDetails(requestId, options) {
        return api('requests/' + requestId, null, options, {
          'isBearerEndpoint': true
        });
      }

     /**
      * Issues a POST request to the /v1/requests/estimate endpoint and returns a price estimate object based on the specified productId and pickup/dropoff coordinates.
      * @param {string, float} product_id - The unique ID of the product being requested.
      * @param {string, float} start_latitude - The beginning or "pickup" latitude.
      * @param {string, float} start_longitude - The beginning or "pickup" longitude.
      * @param {string, float} end_latitude (optional) - The final or destination latitude. If not included, only the pickup ETA and details of surge pricing will be included.
      * @param {string, float} end_longitude (optional) - The final or destination longitude. If not included, only the pickup ETA and details of surge pricing will be included.
      * @param {object} options (optional) - Override options set in the config.
      * @returns {object} - A promise object which resolves a request estimate object on success, and an error object on failure.
      */
      function getRequestEstimate(productId, startLatitude, startLongitude, endLatitude, endLongitude, options) {
        return api('requests/estimate', null, options, {
          'isBearerEndpoint': true,
          'method': 'POST',
          'data': {
            'product_id': productId,
            'start_latitude': startLatitude,
            'start_longitude': startLongitude,
            'end_latitude': endLatitude,
            'end_longitude': endLongitude
          }
        });
      }

     /**
      * Issues a DELETE request to the /v1/requests/{request_id} endpoint. A status code of HTTP 204 indicates a successful request. Requires a request scope authorized bearerToken to be set.
      * @param {string} requestId - Unique identifier representing a Request.
      * @param {string} options (optional) - Override options set in the config.
      * @returns {object} - A promise object which resolves a cancel request object on success, and an error object on failure.
      */
      function cancelRequest(requestId, options) {
        return api('requests/' + requestId, null, options, {
          'isBearerEndpoint': true,
          'method': 'DELETE'
        });
      }

     /**
      * Issues a GET request to the /v1/requests/{request_id}/map endpoint and returns a request map object containing a link to a map with a visual representation of a Request. Requires a request scope authorized bearerToken to be set.
      * @param {string} requestId - Unique identifier representing a Request.
      * @param {string} options (optional) - Override options set in the config.
      * @returns {object} - A promise object which resolves a request map object on success, and an error object on failure.
      */
      function getRequestMap(requestId, options) {
        return api('requests/' + requestId + '/map', null, options, {
          'isBearerEndpoint': true
        });
      }

     /**
      * Issues a GET request to the /v1/requests/{request_id}/receipt endpoint and returns a receipt information object based on the specified requestId.
      * @param {string} title - 
      * @param {string} author - 
      * @param {string} options (optional) - Override options set in the config.
      * @returns {object} - A promise object which resolves a request receipt object on success, and an error object on failure.
      */
      function getRequestReceipt(requestId, options) {
        return api('requests/' + requestId + '/receipt', null, options, {
          'isBearerEndpoint': true
        });
      }

      // private methods //

     /**
      * A method to check for configuration errors before calling $http.
      * @param {string} endpoint - The Uber API endpoint which is about to be called.
      * @param {object} options - User specified config options.
      * @param {object} endpointConfig - Application specified config options.
      */
      function apiConfigurationCheck(endpoint, options, endpointConfig) {
        if (!endpoint) {
          throw new Error('An endpoint must be specified.');
        }

        if (endpointConfig.isBearerEndpoint && !options.bearerToken && !bearerToken) {
          throw new Error('Bearer token must be specified for ' + endpoint + ' endpoint.');
        }

        if (!options.serverToken && !serverToken && !options.bearerToken && !bearerToken) {
          throw new Error('Options serverToken and bearerToken are not defined.');
        }

        if ((options.useBearerToken || useBearerToken) && !options.bearerToken && !bearerToken) {
          throw new Error('Option useBearerToken specified but bearerToken not defined.');
        }

        if ((options.sandbox || sandbox) && !options.sandboxBaseUrl && !sandboxBaseUrl) {
          throw new Error('Option sandbox is true and sandboxBaseUrl not defined.');
        }
        else if (!options.sandbox && !sandbox && !options.baseUrl && !baseUrl) {
          throw new Error('Option baseUrl not defined.');
        }

        if (!options.version && !endpointConfig.version && !version) {
          throw new Error('Option version not defined.');
        }
      }

     /**
      * A method to build the configuration object to be passed to the $http call.
      * @param {string} endpoint - The Uber API endpoint which is about to be called.
      * @param {object} params - User specified endpoint parameters.
      * @param {object} options - User specified config options.
      * @param {object} endpointConfig - Application specified endpoint config options.
      * @returns {object} - The config object to be passed to the $http call.
      */
      function buildApiConfig(endpoint, params, options, endpointConfig) {
        var apiConfig = {};

        apiConfig.headers = buildHeaders(options, endpointConfig);

        apiConfig.url = buildUrl(endpoint, options, endpointConfig);

        apiConfig.method = endpointConfig.method || 'GET';

        apiConfig.params = params;

        apiConfig.data = endpointConfig.data;

        return apiConfig;
      }

     /**
      * A method to build the $http headers object.
      * @param {object} options - User specified config options.
      * @param {object} endpointConfig - Application specified header config options.
      * @returns {object} - The $http.headers object.
      */
      function buildHeaders(options, endpointConfig) {
        var headers = {};

        if (!endpointConfig.isBearerEndpoint && !options.useBearerToken && !useBearerToken) {
          headers.Authorization = 'Token ' + (options.serverToken || serverToken);
        }
        else {
          headers.Authorization = 'Bearer ' + (options.bearerToken || bearerToken);
        }

        return headers;
      }

     /**
      * A method to build the $http URL string.
      * @param {string} endpoint - The Uber API endpoint which is about to be called.
      * @param {object} options - User specified config options.
      * @param {object} endpointConfig - Application specified URL config options.
      * @returns {object} - The $http.url string.
      */
      function buildUrl(endpoint, options, endpointConfig) {
        var base;

        if (options.sandbox || sandbox) {
          base = options.sandboxBaseUrl || sandboxBaseUrl;
        }
        else {
          base = options.baseUrl || baseUrl;
        }

        base += options.version || endpointConfig.version || version;
        base += endpoint;

        return base;
      }

     /**
      * A method to make a $http call to an Uber API endpoint.
      * @param {string} endpoint - The Uber API endpoint to be called.
      * @param {object} params - User specified endpoint parameters.
      * @param {object} options - User specified config options.
      * @param {object} endpointConfig - Application specified config options.
      * @returns {object} - A promise object which resolves the endpoint specific data on success, and an error object on failure.
      */
      function api(endpoint, params, options, endpointConfig) {
        var deferred,
        apiConfig;

        options = options || {};
        endpointConfig = endpointConfig || {};

        apiConfigurationCheck(endpoint, options, endpointConfig);

        apiConfig = buildApiConfig(endpoint, params, options, endpointConfig);

        deferred = $q.defer();

        $http(apiConfig).success(endpointSuccessCallback).error(endpointErrorCallback);

        return deferred.promise;

        function endpointSuccessCallback(response) {
          deferred.resolve(response);
        }

        function endpointErrorCallback(response) {
          deferred.reject(response);
        }
      }

    };
  }

})();