'use strict';

/**
 * @ngdoc function
 * @name angularUberApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the angularUberApp
 */

angular.module('angularUberApp', ['mbergt.uber'])
    .factory('myUber', function (mbUber) {
        return mbUber({
        	serverToken: 'VzlZPiK15pf1rLotl1sJV9rullyxS4Zc-7gK6ILB'
        });
    })
    .controller('MainCtrl', function ($scope, myUber, $q) {
	    //myUber.setServerToken('VzlZPiK15pf1rLotl1sJV9rullyxS4Zc-7gK6ILB');
	    //$scope.getProducts = myUber.getProducts;
	    //$scope.signIn = myUber.signIn;

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

	    $scope.signIn = function() {
	    	myUber.signIn().then(function(d) {
	    		$scope.uberOutput = prettyJson(d);
	    	});
	    }
	});