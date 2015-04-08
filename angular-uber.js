'use strict';

/**
 * @ngdoc overview
 * @name angularUberApp
 * @description
 * # angularUberApp
 *
 * Main module of the application.
 */
angular.module('mbergt.uber', [])
    .factory('mbUber', function ($q, $http) {
        return function modalFactory(config) {
            config = config || {};

            var baseUrl = config.baseUrl || 'https://api.uber.com',
                version = config.version || '/v1/',
                serverToken = config.serverToken,
                bearerToken = config.bearerToken,
                clientId = config.clientId,
                sandbox = config.sandbox || false,
                sandboxBaseUrl = config.sandboxBaseUrl || 'https://sandbox-api.uber.com';

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

            function api(endpoint, params, options, apiConfig) {
                apiConfig = apiConfig || {},
                options = options || {};

                if (!endpoint || endpoint.length === 0) {
                    throw new Error('An endpoint must be specified.');
                }

                if (!apiConfig.headers && (!serverToken || serverToken.length === 0)) {
                    throw new Error('A server token must be specified.');
                }

                if (apiConfig.headers && (!apiConfig.headers.Authorization || apiConfig.headers.Authorization.length === 0)) {
                    throw new Error('The authorization header must be specified for all endpoints.');
                }

                function buildBaseUrl() {
                    var base = (options.sandbox || getSandbox()) ? (options.sandboxBaseUrl || getSandboxBaseUrl()) : (options.baseUrl || getbaseUrl());
                        base += (options.version || apiConfig.version || version);
                        //base += (apiConfig.sandbox || sandbox) ? 'sandbox/' : '';
                        base += endpoint;
                    return base;
                }

                var deferred = $q.defer();

                $http({
                    url: buildBaseUrl(),
                    method: apiConfig.method || 'GET',
                    params: params,
                    data: apiConfig.data,
                    headers: apiConfig.headers || { Authorization: 'Token ' + (options.serverToken || getServerToken()) }
                })
                .success(function (data) {
                    deferred.resolve(data);
                })
                .error(function (data) {
                    deferred.reject(data);
                });

                return deferred.promise;
            }

            function getProducts(latitude, longitude, options) {
                return api('products', {
                    'latitude': latitude,
                    'longitude': longitude
                }, options);
            }

            function getProduct(productId, options) {
                return api('products/' + productId, options);
            }

            function getPriceEstimates(startLatitude, startLongitude, endLatitude, endLongitude, options) {
                return api('estimates/price', {
                    'start_latitude': startLatitude,
                    'start_longitude': startLongitude,
                    'end_latitude': endLatitude,
                    'end_longitude': endLongitude
                }, options);
            }

            function getTimeEstimates(startLatitude, startLongitude, customerUuid, productId, options) {
                return api('estimates/time', {
                    'start_latitude': startLatitude,
                    'start_longitude': startLongitude,
                    'customer_uuid': customerUuid,
                    'product_id': productId
                }, options);
            }

            function getPromotions(startLatitude, startLongitude, endLatitude, endLongitude, options) {
                return api('promotions', {
                    'start_latitude': startLatitude,
                    'start_longitude': startLongitude,
                    'end_latitude': endLatitude,
                    'end_longitude': endLongitude
                }, options);
            }

            function getHistory(offset, limit, options) {
                options = options || {};

                if (!options.bearerToken && !getBearerToken()) {
                    throw new Error('Bearer token must be specified for history endpoint.');
                }

                var apiConfig = {};
                apiConfig.version = options.version || '/v1.1/';

                apiConfig.headers = {
                    'Authorization': 'Bearer ' + (options.bearerToken || getBearerToken())
                };

                return api('history', {
                    'offset': offset,
                    'limit': limit
                }, options, apiConfig);
            }

            function getUserProfile(options) {
                options = options || {};

                if (!options.bearerToken && !getBearerToken()) {
                    throw new Error('Bearer token must be specified for me endpoint.');
                }

                var apiConfig = {};
                apiConfig.headers = {
                    'Authorization': 'Bearer ' + (options.bearerToken || getBearerToken())
                };

                return api('me', null, options, apiConfig);
            }

            function makeRequest(productId, startLatitude, startLongitude, endLatitude, endLongitude, surgeConfirmationId, options) {
                options = options || {};

                if (!options.bearerToken && !getBearerToken()) {
                    throw new Error('Bearer token must be specified for requests endpoint.');
                }

                var apiConfig = {};
                apiConfig.data = {
                    'product_id': productId,
                    'start_latitude': startLatitude,
                    'start_longitude': startLongitude,
                    'end_latitude': endLatitude,
                    'end_longitude': endLongitude,
                    'surge_confirmation_id': surgeConfirmationId
                }
                console.log(getBearerToken())
                apiConfig.headers = {
                    'Authorization': 'Bearer ' + (options.bearerToken || getBearerToken())
                };

                apiConfig.method = 'POST';

                return api('requests', null, options, apiConfig);
            }

            function getRequestDetails(requestId, options) {
                options = options || {};

                if (!options.bearerToken && !getBearerToken()) {
                    throw new Error('Bearer token must be specified for requests/{request_id} endpoint.');
                }

                var apiConfig = {};
                apiConfig.headers = {
                    'Authorization': 'Bearer ' + (options.bearerToken || getBearerToken())
                };

                return api('requests/' + requestId, null, options, apiConfig);
            }

            function cancelRequest(requestId, options) {
                options = options || {};

                if (!options.bearerToken && !getBearerToken()) {
                    throw new Error('Bearer token must be specified for requests endpoint.');
                }

                var apiConfig = {};
                apiConfig.headers = {
                    'Authorization': 'Bearer ' + (options.bearerToken || getBearerToken())
                };

                apiConfig.method = 'DELETE';

                return api('requests/' + requestId, null, options, apiConfig);
            }

            function getRequestMap(requestId, options) {
                options = options || {};

                if (!options.bearerToken && !getBearerToken()) {
                    throw new Error('Bearer token must be specified for requests/{request_id}/map endpoint.');
                }

                var apiConfig = {};
                apiConfig.headers = {
                    'Authorization': 'Bearer ' + (options.bearerToken || getBearerToken())
                };

                return api('requests/' + requestId + '/map', null, options, apiConfig);
            }

            return {
                setBaseUrl: setBaseUrl,
                getBaseUrl: getBaseUrl,
                setVersion: setVersion,
                getVersion: getVersion,
                setServerToken: setServerToken,
                getServerToken: getServerToken,
                setBearerToken: setBearerToken,
                getBearerToken: getBearerToken,
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


        };
    });
