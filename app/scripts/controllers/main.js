'use strict';

/**
 * @ngdoc function
 * @name angularUberApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the angularUberApp
 */

angular.module('angularUberApp', ['mbergt.uber', 'ngRoute'])
    .factory('myUber', function (mbUber) {
        return mbUber({
        	serverToken: 'VzlZPiK15pf1rLotl1sJV9rullyxS4Zc-7gK6ILB',
        	clientId: 'jWWyetwuXd4D8ePGYawyYXRMdj-5MzoL'
        });
    })
    .controller('MainCtrl', function ($scope, myUber, $q) {	    	 

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

	    $scope.getHistory = function() {
	    	myUber.getHistory(0, 5).then(function(d) {
	    		$scope.uberOutput = prettyJson(d);
	    	});
	    }

	    $scope.getUserProfile = function() {
	    	myUber.getUserProfile().then(function(d) {
	    		$scope.uberOutput = prettyJson(d);
	    	});
	    }

	    $scope.uberLogin = function() {
	    	window.location = "https://login.uber.com/oauth/authorize?" 
	    		+ "response_type=code&"
	    		+ "client_id=" + myUber.getClientId();	    		
	    }

	    $scope.authenticate = function() {
	    	console.log(window.location.search);
	    }

	    $scope.setCode = function(d) {
	    	console.log(d);
	    }

	})
	.config(['$routeProvider',
		function($routeProvider) {
			$routeProvider.
			when('/:code', {  action: 'main.setCode' });
		}
	]);