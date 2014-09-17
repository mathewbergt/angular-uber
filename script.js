'use strict';

angular.module('mbergt.uber', []).
factory('mbUber', function($q, $http) {
  return function modalFactory(config) {
    
    var baseUrl = 'https://api.uber.com/v1',
        serverToken = null;
    
    function setServerToken(token){
      serverToken = token;
    }
    
    function getServerToken(){
      return serverToken;
    }
    
    function getProducts() {
      //var baseUrl = 'https://api.uber.com/v1/products'
      
      // var parameters = {
      //   latitude: "37.775818",
      //   longitude: "-122.418028",
      //   serverToken: 'VzlZPiK15pf1rLotl1sJV9rullyxS4Zc-7gK6ILB'
      // };
      
      
      
      $http({
          method: 'GET',
          url: 'https://api.uber.com/v1/products?latitude=37.7759792&longitude=-122.41823&server_token=VzlZPiK15pf1rLotl1sJV9rullyxS4Zc-7gK6ILB',
          headers: {
              "Authorization": "VzlZPiK15pf1rLotl1sJV9rullyxS4Zc-7gK6ILB"
          }
      }).
      success(function(data, status, headers, config) {
        console.log('success');
        console.log(data);
      }).
      error(function(data, status, headers, config) {
        console.log('error');
        console.log(data);
      });

      // var xhr = new XMLHttpRequest();
      // xhr.open('GET', 'https://api.uber.com/v1/products?latitude=37.7759792&longitude=-122.41823&server_token=VzlZPiK15pf1rLotl1sJV9rullyxS4Zc-7gK6ILB', true);
      // xhr.setRequestHeader("Authorization", "VzlZPiK15pf1rLotl1sJV9rullyxS4Zc-7gK6ILB");
      // xhr.send();
      
      //xhr.withCredentials = true;
      //xhr.setRequestHeader("Access-Control-Allow-Origin", "");
      //xhr.setRequestHeader("Origin", "3295jn235jk23j5k2j3kla5j");
      

      // $http({ 
      //   method: 'GET', 
      //   url: url,
      //   params: parameters, 
      //   headers: {
      //     'Authorization': "MNDPWpoL2NefcEjz1DlMz9BYFGEbRu34u5kXl7TM"
      //   }
      // }).
      // success(function(data, status, headers, config) {
      //   console.log('success');
      //   console.log(data);
      // }).
      // error(function(data, status, headers, config) {
      //   console.log('error');
      //   console.log(data);
      // });
    }


    return {
      getProducts: getProducts,
      setServerToken: setServerToken,
      getServerToken: getServerToken
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
  console.log(myUber.getServerToken());
  
  $scope.getProducts = myUber.getProducts;
});
