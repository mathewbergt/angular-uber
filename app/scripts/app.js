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

            function signIn() {
                var userLatitude = '37.775818';
                var userLongitude = '-122.418028';
                
                var partyLatitude = '37.779185';
                var partyLongitude = '-122.859645';
                
                // Redirect to Uber API via deep-linking to the mobile web-app
                var uberURL = "https://m.uber.com/sign-up?";

                // Add parameters
                uberURL += "client_id=" + clientId;
                //if (typeof userLatitude != typeof undefined) uberURL += "&" + "pickup_latitude=" + userLatitude;
                //if (typeof userLongitude != typeof undefined) uberURL += "&" + "pickup_longitude=" + userLongitude;
                uberURL += "&" + "pickup_latitude=" + userLatitude;
                uberURL += "&" + "pickup_longitude=" + userLongitude;
                uberURL += "&" + "dropoff_latitude=" + partyLatitude;
                uberURL += "&" + "dropoff_longitude=" + partyLongitude;
                uberURL += "&" + "dropoff_nickname=" + "MattTest";

                // Redirect to Uber
                window.location.href = uberURL;
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
                return {};
            }

            function getHistory(offset, limit, version) {
                return {};
            }

            function getUserProfile() {
                return {};
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




            return {
                setServerToken: setServerToken,
                getServerToken: getServerToken,
                setClientId: setClientId,
                getClientId: getClientId,
                getProducts: getProducts,
                signIn: signIn,
                getPriceEstimates: getPriceEstimates,
                getTimeEstimates: getTimeEstimates,
                getHistory: getHistory,
                getUserProfile: getUserProfile,
                setAuthCredentials: setAuthCredentials
            };


        };
    });

angular.module('angularUberApp', ['mbergt.uber'])
    .factory('myUber', function (mbUber) {
        return mbUber({
            serverToken: 'VzlZPiK15pf1rLotl1sJV9rullyxS4Zc-7gK6ILB'//,
            //clientId: 'jWWyetwuXd4D8ePGYawyYXRMdj-5MzoL'
        });
    });