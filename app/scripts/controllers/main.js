'use strict';

/**
 * @ngdoc function
 * @name angularUberApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the angularUberApp
 */
angular.module('angularUberApp')
.controller('MainCtrl', function ($scope, myUber) {
	myUber.setServerToken('VzlZPiK15pf1rLotl1sJV9rullyxS4Zc-7gK6ILB');
	//console.log(myUber.getServerToken());

	$scope.getProducts = myUber.getProducts;
});
