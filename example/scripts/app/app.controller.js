(function() {
    'use strict';

    angular
        .module('angularUberTestApp')
        .controller('MainCtrl', MainCtrl);

    MainCtrl.$inject = ['myUber', '$q', '$http', '$window'];

    function MainCtrl(myUber, $q, $http, $window) {
        var vm = this;

        function prettyJson(data) {
          return JSON.stringify(data, null, '\t');
        }

        function initAuth(clientId) {
            var deferred = $q.defer();

            $http({
                url: '/auth/init',
                method: 'POST',
                data: {
                    'client_id': clientId || myUber.getClientId()
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

        this.getProducts = function() {
            myUber.getProducts(37.775818, '-122.418028').then(function(d) {
                vm.uberOutput = prettyJson(d);
            });
        };

        this.getProductById = function() {
            myUber.getProduct('d4abaae7-f4d6-4152-91cc-77523e8165a4').then(function(d) {
                vm.uberOutput = prettyJson(d);
            });
        };

        this.getPriceEstimates = function() {
            myUber.getPriceEstimates('37.775818', '-122.418028', '37.8', '-122.5').then(function(d) {
                vm.uberOutput = prettyJson(d);
            });
        };

        this.getTimeEstimates = function() {
            myUber.getTimeEstimates('37.775818', '-122.418028').then(function(d) {
                vm.uberOutput = prettyJson(d);
            });
        };

        this.getPromotions = function() {
            myUber.getPromotions('37.775818', '-122.418028', '37.8', '-122.5').then(function(d) {
                vm.uberOutput = prettyJson(d);
            });
        };

        this.getHistoryV11 = function() {
            myUber.getHistory(0, 5, { 'version': '/v1.1/' }).then(function(d) {
                vm.uberOutput = prettyJson(d);
            });
        };

        this.getHistoryV12 = function () {
            myUber.getHistory(0, 5, { 'version': '/v1.2/' }).then(function(d) {
                vm.uberOutput = prettyJson(d);
            });
        };

        this.getUserProfile = function() {
            myUber.getUserProfile().then(function(d) {
                vm.uberOutput = prettyJson(d);
            });
        };

        this.authorize = function() {
            initAuth().then(function() {
                $window.location.href = 'https://localhost:8080/auth/doauth';
            });
        };

        this.makeRequest = function() {
            myUber.makeRequest(
                'a1111c8c-c720-46c3-8534-2fcdd730040d',
                '37.775818',
                '-122.418028',
                '37.8',
                '-122.5',
                null,
                { sandbox: true }
            ).then(function(d) {
                vm.uberOutput = prettyJson(d);
            });
        };

        this.getRequestDetails = function() {
            myUber.getRequestDetails('75e46c73-d6cb-4719-a821-77fcc08bf576').then(function(d) {
                vm.uberOutput = prettyJson(d);
            });
        };

        this.getRequestEstimate = function() {
            myUber.getRequestEstimate(
                'a1111c8c-c720-46c3-8534-2fcdd730040d',
                '37.775818',
                '-122.418028',
                '37.8',
                '-122.5',
                null,
                { sandbox: true }
            ).then(function(d) {
                vm.uberOutput = prettyJson(d);
            });
        };

        this.cancelRequest = function() {
            myUber.cancelRequest('75e46c73-d6cb-4719-a821-77fcc08bf576').then(function(d) {
                vm.uberOutput = prettyJson(d);
            });
        };

        this.getRequestMap = function() {
            myUber.getRequestMap('75e46c73-d6cb-4719-a821-77fcc08bf576').then(function(d) {
                vm.uberOutput = prettyJson(d);
            });
        };

        this.getRequestReceipt = function() {
            myUber.getRequestReceipt('75e46c73-d6cb-4719-a821-77fcc08bf576').then(function(d) {
                vm.uberOutput = prettyJson(d);
            });
        };

        this.setBearerToken = function(token) {
            myUber.setBearerToken(token);
        };
    }

})();