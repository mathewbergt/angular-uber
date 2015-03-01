'use strict';

/**
 * @ngdoc function
 * @name angularUberApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the angularUberApp
 */
angular.module('angularUberApp').
controller('MainCtrl', function ($scope, myUber, $q) {
    //myUber.setServerToken('VzlZPiK15pf1rLotl1sJV9rullyxS4Zc-7gK6ILB');
    //$scope.getProducts = myUber.getProducts;
    $scope.signIn = myUber.signIn;
    //$scope.getPriceEstimates = myUber.getPriceEstimates;

    $scope.getProducts = function() {
    	$q.when(myUber.getProducts('37.775818', '-122.418028')).then(function(d) {
    		$scope.uberOutput = JSON.stringify(d);
    	});
    }

    $scope.getPriceEstimates = function() {
    	$q.when(myUber.getPriceEstimates('37.775818', '-122.418028', '37.8', '-122.5')).then(function(d) {
    		$scope.uberOutput = JSON.stringify(d);
    	});
    }

    $scope.getTimeEstimates = function() {
    	$q.when(myUber.getTimeEstimates('37.775818', '-122.418028')).then(function(d) {
    		$scope.uberOutput = JSON.stringify(d);
    	});
    }
});