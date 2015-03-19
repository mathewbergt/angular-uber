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
            if (!config) {
                config = {};
            }

            var baseUrl = config.baseUrl || 'https://api.uber.com',
                version = config.version || '/v1/',
                serverToken = config.serverToken,
                clientId = config.clientId,
                bearerToken = config.bearerToken;

            function api(endpoint, params, headers, data, method) {
                var deferred = $q.defer();

                $http({
                    url: baseUrl + version + endpoint,
                    method: method ? method : 'GET',
                    params: params,
                    data: data,
                    headers: headers || { Authorization: "Token " + serverToken }
                })
                .success(function (data) {
                    deferred.resolve(data);
                })
                .error(function (data) {
                    deferred.reject(data);
                });

                return deferred.promise;
            };

            function setServerToken(token) {
                serverToken = token;
            }

            function getServerToken() {
                return serverToken;
            }

            function setBearerToken(token) {
                bearerToken = token;
            }

            function getBearerToken(token) {
                return bearerToken;
            }

            function setClientId(clientId) {
                clientId = clientId;
            }

            function getClientId() {
                return clientId;
            }

            function getProducts(latitude, longitude) {
                return api('products', {
                    latitude: latitude,
                    longitude: longitude
                });
            }            

            function getPriceEstimates(startLatitude, startLongitude, endLatitude, endLongitude) {
                return api('estimates/price', {
                    start_latitude: startLatitude,
                    start_longitude: startLongitude,
                    end_latitude: endLatitude,
                    end_longitude: endLongitude
                });
            }

            function getTimeEstimates(startLatitude, startLongitude, customerUuid, productId) {
                return api('estimates/time', {
                    start_latitude: startLatitude,
                    start_longitude: startLongitude,
                    customer_uuid: customerUuid,
                    product_id: productId
                });
            }

            function getPromotions(startLatitude, startLongitude, endLatitude, endLongitude) {
                return api('promotions', {
                    start_latitude: startLatitude,
                    start_longitude: startLongitude,
                    end_latitude: endLatitude,
                    end_longitude: endLongitude
                });
            }

            function getHistory(offset, limit, version) {
                return api((version || 'v1.1') + '/history', {
                    offset: offset,
                    limit: limit
                });
            }

            function getUserProfile() {
                return api('me', {}, { Authorization: 'Bearer ' + '16bcxG749zqbM2G2zKNMIQyRdDPfqg' });
            }

            function initAuth(clientId) {
                var deferred = $q.defer();
                
                $http({
                    url: '/auth/init',
                    method: 'POST',
                    data: {
                        client_id: clientId || getClientId()
                    }
                })
                .success(function (data) {
                    deferred.resolve(data);
                })
                .error(function (data) {
                    deferred.reject(data);
                });

                return deferred.promise;
            }


            return {
                setServerToken: setServerToken,
                getServerToken: getServerToken,
                setBearerToken: setBearerToken,
                getBearerToken: getBearerToken,
                setClientId: setClientId,
                getClientId: getClientId,
                getProducts: getProducts,
                getPriceEstimates: getPriceEstimates,
                getTimeEstimates: getTimeEstimates,
                getPromotions: getPromotions,
                getHistory: getHistory,
                getUserProfile: getUserProfile,
                initAuth: initAuth
            };


        };
    });