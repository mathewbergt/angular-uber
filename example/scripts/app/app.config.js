(function() {
    'use strict';

    angular
        .module('angularUberTestApp')
        .config(config);

    config.$inject = ['$stateProvider'];

    function config($stateProvider){
        $stateProvider
            .state('authorized', {
                url: '/access_token/:accessToken',
                //onEnter: function() {},
                controller: ['$stateParams', 'myUber', function($stateParams, myUber) {
                    myUber.setBearerToken($stateParams.accessToken);
                }]
            });
    }

})();