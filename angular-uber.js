(function() {
    'use strict';

    angular
        .module('mbergt.uber', [])
        .factory('mbUber', mbUber);

    mbUber.$inject = ['$q', '$http'];

    function mbUber($q, $http) {
        return function uberFactory(config) {
            config = config || {};

            var baseUrl = config.baseUrl || 'https://api.uber.com',
                version = config.version || '/v1/',
                serverToken = config.serverToken,
                bearerToken = config.bearerToken,
                useBearerToken = config.useBearerToken,
                clientId = config.clientId,
                sandbox = config.sandbox || false,
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
                setSandbox: setSandbox,
                getSandbox: getSandbox,
                setSandboxBaseUrl: setSandboxBaseUrl,
                getSandboxBaseUrl: getSandboxBaseUrl,
                setClientId: setClientId,
                getClientId: getClientId,
                getProducts: getProducts,
                getProduct: getProduct,
                getPriceEstimates: getPriceEstimates,
                getTimeEstimates: getTimeEstimates,
                getPromotions: getPromotions,
                getHistory: getHistory,
                getUserProfile: getUserProfile,
                makeRequest: makeRequest,
                getRequestDetails: getRequestDetails,
                cancelRequest: cancelRequest,
                getRequestMap: getRequestMap
            };

            function setBaseUrl() {
                baseUrl = arguments[0];
            }

            function getBaseUrl() {
                return baseUrl;
            }

            function setVersion(version) {
                version = arguments[0];
            }

            function getVersion() {
                return version;
            }

            function setServerToken() {
                serverToken = arguments[0];
            }

            function getServerToken() {
                return serverToken;
            }

            function setBearerToken() {
                bearerToken = arguments[0];
            }

            function getBearerToken() {
                return bearerToken;
            }

            function setUseBearerToken() {
                useBearerToken = arguments[0];
            }

            function getUseBearerToken() {
                return useBearerToken;
            }

            function setClientId() {
                clientId = arguments[0];
            }

            function getClientId() {
                return clientId;
            }

            function setSandbox() {
                sandbox = arguments[0];
            }

            function getSandbox() {
                return sandbox;
            }

            function setSandboxBaseUrl() {
                sandboxBaseUrl = arguments[0];
            }

            function getSandboxBaseUrl() {
                return sandboxBaseUrl;
            }

            function getProducts(latitude, longitude, options) {
                var apiConfig = buildApiConfig(options);

                return api('products', {
                    'latitude': latitude,
                    'longitude': longitude
                }, apiConfig);
            }

            function getProduct(productId, options) {
                var apiConfig = buildApiConfig(options);

                return api('products/' + productId, apiConfig);
            }

            function getPriceEstimates(startLatitude, startLongitude, endLatitude, endLongitude, options) {
                var apiConfig = buildApiConfig(options);

                return api('estimates/price', {
                    'start_latitude': startLatitude,
                    'start_longitude': startLongitude,
                    'end_latitude': endLatitude,
                    'end_longitude': endLongitude
                }, apiConfig);
            }

            function getTimeEstimates(startLatitude, startLongitude, customerUuid, productId, options) {
                var apiConfig = buildApiConfig(options);

                return api('estimates/time', {
                    'start_latitude': startLatitude,
                    'start_longitude': startLongitude,
                    'customer_uuid': customerUuid,
                    'product_id': productId
                }, apiConfig);
            }

            function getPromotions(startLatitude, startLongitude, endLatitude, endLongitude, options) {
                var apiConfig = buildApiConfig(options);

                return api('promotions', {
                    'start_latitude': startLatitude,
                    'start_longitude': startLongitude,
                    'end_latitude': endLatitude,
                    'end_longitude': endLongitude
                }, apiConfig);
            }

            function getHistory(offset, limit, options) {
                var apiConfig;

                options = options || {};

                bearerIsDefinedCheck(options, 'history');

                apiConfig = {
                    'version': options.version || '/v1.1/',
                    'headers': buildBearerHeaders(options)
                };

                return api('history', {
                    'offset': offset,
                    'limit': limit
                }, apiConfig);
            }

            function getUserProfile(options) {
                var apiConfig;

                options = options || {};

                bearerIsDefinedCheck(options, 'me');

                apiConfig = { 'headers': buildBearerHeaders(options) };

                return api('me', null, apiConfig);
            }

            function makeRequest(productId, startLatitude, startLongitude, endLatitude, endLongitude, surgeConfirmationId, options) {
                var apiConfig;

                options = options || {};

                bearerIsDefinedCheck(options, 'requests');

                apiConfig = {
                    'data': {
                        'product_id': productId,
                        'start_latitude': startLatitude,
                        'start_longitude': startLongitude,
                        'end_latitude': endLatitude,
                        'end_longitude': endLongitude,
                        'surge_confirmation_id': surgeConfirmationId
                    },
                    'headers': buildBearerHeaders(options),
                    'method': 'POST'
                };

                return api('requests', null, apiConfig);
            }

            function getRequestDetails(requestId, options) {
                var apiConfig;

                options = options || {};

                bearerIsDefinedCheck(options, 'requests/{request_id}');

                apiConfig = { 'headers': buildBearerHeaders(options) };

                return api('requests/' + requestId, null, apiConfig);
            }

            function cancelRequest(requestId, options) {
                var apiConfig;

                options = options || {};

                bearerIsDefinedCheck(options, 'requests');

                apiConfig = {
                    'headers': buildBearerHeaders(options),
                    'method': 'DELETE'
                };

                return api('requests/' + requestId, null, apiConfig);
            }

            function getRequestMap(requestId, options) {
                var apiConfig;

                options = options || {};

                bearerIsDefinedCheck(options, 'requests/{request_id}/map');

                apiConfig = { 'headers': buildBearerHeaders(options) };

                return api('requests/' + requestId + '/map', null, apiConfig);
            }

            // private methods //

            function bearerIsDefinedCheck(options, endpoint) {
                if (!options.bearerToken && !bearerToken) {
                    throw new Error('Bearer token must be specified for ' + endpoint + ' endpoint.');
                }
            }

            function apiConfigurationCheck(apiConfig) {
                if (!endpoint || endpoint.length === 0) {
                    throw new Error('An endpoint must be specified.');
                }

                if (!apiConfig.headers && (!serverToken || serverToken.length === 0)) {
                    throw new Error('A server token must be specified.');
                }

                if (apiConfig.headers && (!apiConfig.headers.Authorization || apiConfig.headers.Authorization.length === 0)) {
                    throw new Error('The authorization header must be specified for all endpoints.');
                }
            }

            function api(endpoint, params, apiConfig) {
                var deferred;

                apiConfig = apiConfig || {};

                apiConfigurationCheck(apiConfig);

                deferred = $q.defer();

                $http(apiConfig)
                    .success(function (data) {
                        deferred.resolve(data);
                    })
                    .error(function (data) {
                        deferred.reject(data);
                    });

                return deferred.promise;
            }

            function buildApiConfig(options) {
                var apiConfig;

                if (!options.useBearerToken && !useBearerToken) {
                    apiConfig.headers = { 
                        'Authorization': 'Token ' + (options.serverToken || apiConfig.serverToken || serverToken) 
                    };
                }

                apiConfig = {
                    'url': buildUrl(endpoint, apiConfig),
                    'method': apiConfig.method || 'GET',
                    'params': params,
                    'data': apiConfig.data,
                    'headers': apiConfig.headers || { 'Authorization': 'Token ' + (apiConfig.serverToken || serverToken) }
                };

            }

            function buildBearerHeaders(options) {
                return { 'Authorization': 'Bearer ' + (options.bearerToken || bearerToken) };
            }

            function buildUrl(endpoint, apiConfig) {
                var base;
                    base = (apiConfig.sandbox || getSandbox()) ?
                                (apiConfig.sandboxBaseUrl || sandboxBaseUrl) :
                                (apiConfig.baseUrl || baseUrl);
                    base += (apiConfig.version || version);
                    base += endpoint;
                return base;
            }
        }
    }

})();
