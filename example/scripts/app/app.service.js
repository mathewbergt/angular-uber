(function() {
	'use strict';

	angular
        .module('angularUberTestApp')
        .factory('myUber', myUber);

    myUber.$inject = ['mbUber'];

    function myUber(mbUber) {
        return mbUber({
            serverToken: 'VzlZPiK15pf1rLotl1sJV9rullyxS4Zc-7gK6ILB',
            bearerToken: 'myBearerToken',
            clientId: 'jWWyetwuXd4D8ePGYawyYXRMdj-5MzoL',
            sandbox: true
        });
    }

})();