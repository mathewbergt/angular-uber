'use strict';

angular.module('mbergt.uber', []).
factory('mbUber', function($q, $http) {
  return function modalFactory(config) {
    //https://login.uber.com/oauth/token?client_secret=TrYjG6u07PKGKQt5Y4mM5qjPOee07fj4J9MBS3lb&client_id=jWWyetwuXd4D8ePGYawyYXRMdj-5MzoL&grant_type=authorization_code&redirect_uri=https://mathewbergt.github.io/angular-uber&code=8dk6uFp5pV6KG5gUS6hnhXKqPngtC7
    var baseUrl = 'https://api.uber.com',
        version = '/v1/',
        serverToken = 'VzlZPiK15pf1rLotl1sJV9rullyxS4Zc-7gK6ILB',
        clientId = null,
        authCredentials = {
          response_type: null,
          client_id: null,
          scope: null,
          state: null,
          redirect_uri: null
        };
        
    function api(endpoint, params, data, headers, method) {
      var deferred = $q.defer();
      
      $http({
        url: baseUrl + version + endpoint,
        method: method ? method : 'GET',
        params: params,
        data: data,
        headers: headers
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
      latitude = '37.775818';
      longitude = '-122.418028';
      serverToken = 'VzlZPiK15pf1rLotl1sJV9rullyxS4Zc-7gK6ILB';
      var path = 'products';
      //var parms = '?latitude=37.7759792&longitude=-122.41823&server_token=VzlZPiK15pf1rLotl1sJV9rullyxS4Zc-7gK6ILB';
      var result = {};
      api('products', 
          { latitude: '37.775818', longitude: '-122.418028' },
          { Authorization: 'VzlZPiK15pf1rLotl1sJV9rullyxS4Zc-7gK6ILB' }
      );
      // $http({
      //     method: 'GET',
      //     url: baseUrl + version + path, // + parms,
      //     params: {
      //       latitude: latitude,
      //       longitude: longitude,
      //       server_token: serverToken
      //     },
      //     headers: {
      //       'Authorization': serverToken
      //     }
      // }).
      // success(function(data, status, headers, config) {
      //   console.log('success');
      //   console.log(data);
      //   result = data;
      // }).
      // error(function(data, status, headers, config) {
      //   console.log('error');
      //   console.log(data);
      // });
      
      // $http({
      //     method: 'JSONP',
      //     url: 'https://login.uber.com/oauth/token?callback=JSON_CALLBACK',
      //     params: {
      //       client_secret: 'TrYjG6u07PKGKQt5Y4mM5qjPOee07fj4J9MBS3lb',
      //       client_id: 'jWWyetwuXd4D8ePGYawyYXRMdj-5MzoL',
      //       grant_type: 'authorization_code',
      //       redirect_uri: 'https://mathewbergt.github.io/angular-uber',
      //       code: '0UfXCJNuJvsPvZJEwEMIXFytoBlw8K'
      //     }
      // }).
      // success(function(data, status, headers, config) {
      //   console.log('success');
      //   console.log(data);
      // }).
      // error(function(data, status, headers, config) {
      //   console.log('error');
      //   console.log(data);
      // });
      
      // myData([{
      //   client_secret: 'TrYjG6u07PKGKQt5Y4mM5qjPOee07fj4J9MBS3lb',
      //   client_id: 'jWWyetwuXd4D8ePGYawyYXRMdj-5MzoL',
      //   grant_type: 'authorization_code',
      //   redirect_uri: 'https://mathewbergt.github.io/angular-uber&code=8dk6uFp5pV6KG5gUS6hnhXKqPngtC7'
      // }]);
      
      // $http.jsonp('https://login.uber.com/oauth/token?myData')
      // .success(function(data){
      //   console.log('success');
      // })
      // .error(function () {
      //   console.log('error')
      // });
      
      
      
      // var xhr = new XMLHttpRequest();
      
      // xhr.open('GET', 'https://api.uber.com/v1/products?latitude=37.7759792&longitude=-122.41823&server_token=VzlZPiK15pf1rLotl1sJV9rullyxS4Zc-7gK6ILB', true);
      // xhr.setRequestHeader("Authorization", "VzlZPiK15pf1rLotl1sJV9rullyxS4Zc-7gK6ILB");
      
      //xhr.open('GET', 'https://login.uber.com/oauth/token?client_secret=TrYjG6u07PKGKQt5Y4mM5qjPOee07fj4J9MBS3lb&client_id=jWWyetwuXd4D8ePGYawyYXRMdj-5MzoL&grant_type=authorization_code&redirect_uri=https://mathewbergt.github.io/angular-uber&code=8dk6uFp5pV6KG5gUS6hnhXKqPngtC7', true);
      //xhr.setRequestHeader("Authorization", "VzlZPiK15pf1rLotl1sJV9rullyxS4Zc-7gK6ILB");
      
      // xhr.send();
      //document.write(JSON.stringify(result.products));
      return {};
      
    }
    
    function getPriceEstimates(startLatitude, startLongitude, endLatitude, endLongitude) {
      return {};
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
      getPriceEstimates: getPriceEstimates,
      getTimeEstimates: getTimeEstimates,
      getHistory: getHistory,
      getUserProfile: getUserProfile,
      setAuthCredentials: setAuthCredentials
    };


  };
});

angular.module('myApp', [
  'mbergt.uber'
]).
factory('myUber', function(mbUber) {
  return mbUber();
}).
controller('MyCtrl', function($scope, myUber) {
  myUber.setServerToken('VzlZPiK15pf1rLotl1sJV9rullyxS4Zc-7gK6ILB');
  //console.log(myUber.getServerToken());
  
  $scope.getProducts = myUber.getProducts;
});
