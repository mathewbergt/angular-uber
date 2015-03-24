'use strict';

/**
 * @ngdoc function
 * @name angularUberApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the angularUberApp
 */

var app = angular.module('angularUberApp', ['mbergt.uber', 'ui.router'])
    .factory('myUber', function (mbUber) {
        return mbUber({
        	serverToken: 'VzlZPiK15pf1rLotl1sJV9rullyxS4Zc-7gK6ILB',
        	clientId: 'jWWyetwuXd4D8ePGYawyYXRMdj-5MzoL'
        });
    })
    .controller('MainCtrl', ['$scope', 'myUber', '$q', '$location', function ($scope, myUber, $q, $location) {	    	 

	    function prettyJson(data) {
	    	return JSON.stringify(data, null, "\t");
	    }

	    $scope.getProducts = function() {
	    	myUber.getProducts('37.775818', '-122.418028').then(function(d) {
	    		$scope.uberOutput = prettyJson(d);
	    	});
	    }

	    $scope.getPriceEstimates = function() {
	    	myUber.getPriceEstimates('37.775818', '-122.418028', '37.8', '-122.5').then(function(d) {
	    		$scope.uberOutput = prettyJson(d);
	    	});
	    }

	    $scope.getTimeEstimates = function() {
	    	myUber.getTimeEstimates('37.775818', '-122.418028').then(function(d) {
	    		$scope.uberOutput = prettyJson(d);
	    	});
	    }

	    $scope.getPromotions = function() {
	    	myUber.getPromotions('37.775818', '-122.418028', '37.8', '-122.5').then(function(d) {
	    		$scope.uberOutput = prettyJson(d);
	    	});
	    }

	    // $scope.getHistory = function() {
	    // 	myUber.getHistory(0, 5).then(function(d) {
	    // 		$scope.uberOutput = prettyJson(d);
	    // 	});
	    // }

	    $scope.getUserProfile = function() {
	    	// myUber.getUserProfile().then(function(d) {
	    	// 	$scope.uberOutput = prettyJson(d);
	    	// });
			var xhr = new XMLHttpRequest();                
                xhr.open('GET', 'https://api.uber.com/v1/me');
                //xhr.setRequestHeader("Authorization", "Token VzlZPiK15pf1rLotl1sJV9rullyxS4Zc-7gK6ILB");
                xhr.setRequestHeader("Authorization", "Bearer cLNqHxcmOeIS3H9wBHCSjIA1oQ95mH");

                xhr.send();
                //return xhr;
	    }

	    $scope.authorize = function() {
	    	myUber.initAuth().then(function(d) {
	    		window.location = 'https://localhost:8080/auth/doauth';
	    	});
	    }

	    $scope.setBearerToken = function(token) {
	    	myUber.setBearerToken(token);
	    }

	}]);

	app.config([
	  '$stateProvider',
	  '$urlRouterProvider',	  
	  function($stateProvider, $urlRouterProvider){

		$stateProvider
			.state('authorized', {
				url: '/access_token/:accessToken',
				onEnter: function() {},
				controller: ['$stateParams', '$scope', function($stateParams, $scope) {
					console.log($stateParams)
					$scope.setBearerToken($stateParams.accessToken);
				}]
			});
	  }
	])
	.run(['$state', function ($state) {}]);


