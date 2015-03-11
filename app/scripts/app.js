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
                authCredentials = {
                    response_type: null,
                    client_id: null,
                    scope: null,
                    state: null,
                    redirect_uri: null
                };

            function api(endpoint, params, headers, data, method) {
                var deferred = $q.defer();

                $http({
                    url: baseUrl + version + endpoint,
                    method: method ? method : 'GET',
                    params: params,
                    data: data,
                    headers: {
                        Authorization: "Token " + serverToken
                    }
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
                return api('me');
            }

            function setAuthCredentials(responseType, clientId, scope, state, redirectUri) {
                authCredentials = {
                    response_type: responseType,
                    client_id: clientId,
                    scope: scope,
                    state: state,
                    redirect_uri: redirectUri
                };
            }

            function signIn() {
                var deferred = $q.defer();

                $http({
                    url: 'https://login.uber.com/oauth/token',
                    method: 'POST',
                    params: {
                        client_secret: 'TrYjG6u07PKGKQt5Y4mM5qjPOee07fj4J9MBS3lb',
                        client_id: 'jWWyetwuXd4D8ePGYawyYXRMdj-5MzoL',
                        grant_type: 'authorization_code',
                        redirect_uri: 'https://localhost:9000',
                        code: 'vffWVdV35y764qpwAbTMJEe8ntY3P7'
                    },
                    headers: {
                        Authorization: "Token " + serverToken
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
                setClientId: setClientId,
                getClientId: getClientId,
                getProducts: getProducts,
                signIn: signIn,
                getPriceEstimates: getPriceEstimates,
                getTimeEstimates: getTimeEstimates,
                getPromotions: getPromotions,
                getHistory: getHistory,
                getUserProfile: getUserProfile,
                setAuthCredentials: setAuthCredentials
            };


        };
    });