#angular-uber

*This project is planned to be released by the end of April 2015. The provided angular-uber.js is only a preview of the coming initial version. If you would like to see more, please take a look at the `DEV` branch.*

A factory service for AngularJS to interface with the [Uber API](https://developer.uber.com/v1/endpoints/).

_Notes:_

1. Keep your app SECRET confidential. Several Uber API enpoints require the OAuth2.0 Bearer token. This Angular service does not provide functionality to obtain a Bearer token, only to set it within the factory instance. It is up to you to obtain the Bearer token in a secure manner according to the [OAuth2.0 spec](https://tools.ietf.org/html/rfc6749). More information on the API token authentication process with Uber can be found [here](https://developer.uber.com/v1/auth/). A sample Express app is provided to illustrate the process in which one might obtain a Bearer token.
2. Your origin URI must be set in your Uber API app settings page, and it must use https.
3. If you are developing your Uber API app on a local environment (such as localhost), endpoints which issue `POST` requests do not work in major modern browsers due to security issues. If you want to read more about this issue, read about it on StackOverflow [here](http://stackoverflow.com/questions/21102690/angularjs-not-detecting-access-control-allow-origin-header).

##Table of Contents
* [Install](#install)
* [Usage](#usage)
* [API](#api)
  * [config](#mbuber)
  * [getters and setters](#uberapiservice---getters-and-setters)
  * [endoint methods](#uberapiservice---uber-api-endpoint-methods)

##Install
```shell
npm install angular-uber
```
##Usage
1. Include the angular-uber.js script project into your app.
2. Inject mbergt.uber as a dependancy into your app:

  ```javascript
  var app = angular.module('angularUberApp', ['mbergt.uber']);
  ```
  
3. Initialize a factory instance. Example:

  ```javascript
  app.factory('myUber', function (mbUber) {
    return mbUber({
      serverToken: 'YOUR_SERVER_TOKEN'
    });
  });
  ```
4. Inject the instance for use in a controller. Example:

  ```javascript
  app.controller('MyUberCtrl', ['myUber', function (myUber) {
    myUber.getProducts('37.7', '-122.4').then(function(returnData) {
  		console.log(returnData);
  	});
  }]);
  ```
  
##API
###`mbUber`
The angular-uber factory service. A configuration object can be passed, though is not required on initialization. As of now, all Uber API endpoints require either a Server token or Bearer token. These values can be set within your app using setter methods, which are described below.

  ```javascript
  var uberApiService = mbUber({
    /* config options */
  });
  ```

Returns a `uberApiService` object with various methods to interact with the Uber API.

####`config.baseUrl`
**string**: The base URL to the Uber API. Defaults to `https://api.uber.com`.

####`config.version`
**string**: The version of Uber API to use. Defaults to `/v1/`.

####`config.serverToken`
**string**: The server token from your Uber API app's configuration page.

####`config.bearerToken`
**string**: An OAuth2.0 Bearer token obtained from `https://login.uber.com/oauth/token`. Setting this value overrides the `serverToken` on all calls to API endpoints.

####`config.sandbox`
**boolean**: Indicates whether to use the sandbox version of Uber API. Defaults to `false`.

####`config.sandboxBaseUrl`
**string**: The base URL to the sandbox version of Uber API. Defaults to `https://sandbox-api.uber.com`.

####`config.clientId`
**string**: The client ID from your Uber API app's configuration page.

###`uberApiService - getters and setters`
A `uberApiSerive` has a number of methods to get and set the previously listed config options: 

####`setBaseUrl`
Sets the base URL to the Uber API.

| Parameter        | Type           | Description  |
| ------------- |:-------------:| :-----:|
| baseUrl      | string | The base URL to the Uber API. |

####`getBaseUrl`
**string**: Gets the currently set value for the base URL to the Uber API.

####`setVersion`
Sets the version of Uber API.

| Parameter        | Type           | Description  |
| ------------- |:-------------:| :-----:|
| version      | string | The version of Uber API to use. |

####`getVersion`
**string**: Gets the currently set value for the version of Uber API.

####`setServerToken`
Sets the server token which can be found on your Uber API app configuration page.

| Parameter        | Type           | Description  |
| ------------- |:-------------:| :-----:|
| serverToken      | string | The server token for your Uber API app. |

####`getServerToken`
**string**: Gets the currently set value of the server token.

####`setBearerToken`
Sets the bearer token which is an OAuth2.0 Bearer token obtained from `https://login.uber.com/oauth/token`.

| Parameter        | Type           | Description  |
| ------------- |:-------------:| :-----:|
| bearerToken      | string | The OAuth bearer token obtained from the Uber API. |

####`getBearerToken`
**string**: Gets the currently set value of the bearer token.

####`setSandbox`
Set the uberApiService to use the sandbox version of Uber API.

| Parameter        | Type           | Description  |
| ------------- |:-------------:| :-----:|
| sandbox      | boolean | Indicates whether or not to use Uber API sandbox. |

####`getSandbox`
**boolean**: Gets the currently set value which indicates if the sandbox version of Uber API should be used.

####`setSandboxBaseUrl`
Sets the base URL to the sandbox version of Uber API.

| Parameter        | Type           | Description  |
| ------------- |:-------------:| :-----:|
| sandboxBaseUrl      | string | The base URL to the sandbox version of Uber API. |

####`getSandboxBaseUrl`
**string**: Gets the currently set value for the base URL to the Uber API sandbox.

####`setClientId`
Sets the client ID which can be found on your Uber API app configuration page.

| Parameter        | Type           | Description  |
| ------------- |:-------------:| :-----:|
| clientId      | string | The client ID for your Uber API app. |

####`getClientId`
**string**: Gets the currently set value of the client ID.

###`uberApiService - Uber API endpoint methods`
A `uberApiSerive` has methods which map to the Uber API endpoints. *All of the following methods return a promise:*

####`getProducts`
Issues a `GET` request to the `/v1/products` [endpoint](https://developer.uber.com/v1/endpoints/#product-types). Return data is an object containing an array of products for the specified latitude/longitude. *Requires a serverToken or bearerToken to be set.*

| Parameter        | Type           | Description  |
| ------------- |:-------------:| :-----|
| latitude      | string, float | Latitude component of location. |
| longitude      | string, float | Longitude component of location. |
| options *(optional)*  | object | Override options set in the [config](#configbaseurl). |

Example:
```javascript
uberApiService.getProducts(37.775818, -122.418028).then(function(returnData) {
    console.log(returnData.products);
}, function(errorData) {
    console.log(errorData);
});
```

####`getProduct`
Issues a `GET` request to the `/v1/products/{product_id}` [endpoint](https://developer.uber.com/v1/endpoints/#id1). Return data is a product object for the specified productId. *Requires a serverToken or bearerToken to be set.*

| Parameter        | Type           | Description  |
| ------------- |:-------------:| :-----|
| productId      | string | Latitude component of location. |
| options *(optional)*  | object | Override options set in the [config](#configbaseurl). |

Example:
```javascript
uberApiService.getProduct('d4abaae7-f4d6-4152-91cc-77523e8165a4').then(function(productData) {
    console.log(productData);
}, function(errorData) {
    console.log(errorData);
});
```

####`getPriceEstimates`
Issues a `GET` request to the `/v1/estimates/price` [endpoint](https://developer.uber.com/v1/endpoints/#id6). Return data is an object containing an array of price estimates for the specified latitude/longitude range. *Requires a serverToken or bearerToken to be set.*

| Parameter        | Type           | Description  |
| ------------- |:-------------:| :-----|
| startLatitude      | string, float | Latitude component of start location. |
| startLongitude      | string, float | Longitude component of start location. |
| endLatitude      | string, float | Latitude component of end location. |
| endLongitude      | string, float | Longitude component of end location. |
| options *(optional)*  | object | Override options set in the [config](#configbaseurl). |

Example:
```javascript
uberApiService.getPriceEstimates(37.775818, -122.418028, 37.8, -122.5).then(function(returnData) {
    console.log(returnData.prices);
}, function(errorData) {
    console.log(errorData);
});
```

####`getTimeEstimtates`
Issues a `GET` request to the `/v1/estimates/time` [endpoint](https://developer.uber.com/v1/endpoints/#id11). Return data is an object containing an array of time estimates for the specified latitude/longitude and optional customerUuid and/or productId. *Requires a serverToken or bearerToken to be set.*

| Parameter        | Type           | Description  |
| ------------- |:-------------:| :-----|
| startLatitude      | string, float | Latitude component. |
| startLongitude      | string, float | Longitude component. |
| customerUuid *(optional)*     | string | Unique customer identifier to be used for experience customization. |
| productId  *(optional)*    | string | Unique identifier representing a specific product for a given latitude & longitude. |
| options *(optional)*     | object | Override options set in the [config](#configbaseurl). |

Example:
```javascript
uberApiService.getTimeEstimates(37.775818, -122.418028).then(function(returnData) {
    console.log(returnData.times);
}, function(errorData) {
    console.log(errorData);
});
```

####`getPromotions`
Issues a `GET` request to the `/v1/estimates/promotions` [endpoint](https://developer.uber.com/v1/endpoints/#id15). Return data is a promotions object for the specified latitude/longitude range. *Requires a serverToken or bearerToken to be set.*

| Parameter        | Type           | Description  |
| ------------- |:-------------:| :-----|
| startLatitude      | string, float | Latitude component of start location. |
| startLongitude      | string, float | Longitude component of start location. |
| endLatitude     | string, float | Latitude component of end location. |
| endLongitude    | string, float | Longitude component of end location. |
| options *(optional)*     | object | Override options set in the [config](#configbaseurl). |

Example:
```javascript
uberApiService.getPromotions(37.775818, -122.418028, 37.8, -122.5).then(function(promotionData) {
    console.log(promotionData);
}, function(errorData) {
    console.log(errorData);
});
```

####`getHistory`
Issues a `GET` request to the `/v1.1/history` [endpoint](https://developer.uber.com/v1/endpoints/#id19). Return data is a user activity object for the specified offset and limit. *Requires a history_lite scope authorized bearerToken to be set.*

| Parameter        | Type           | Description  |
| ------------- |:-------------:| :-----|
| offset      | string, integer | Offset the list of returned results by this amount. Default is zero. |
| limit      | string, integer | Number of items to retrieve. Default is 5, maximum is 50. |
| options *(optional)*     | object | Override options set in the [config](#configbaseurl). |

Example:
```javascript
uberApiService.getHistory(0, 5).then(function(historyData) {
    console.log(historyData);
}, function(errorData) {
    console.log(errorData);
});
```

####`getUserProfile`
Issues a `GET` request to the `/v1/me` [endpoint](https://developer.uber.com/v1/endpoints/#id25). Return data is a user profile object based on the currently set `bearerToken`. *Requires a profile scope authorized bearerToken to be set.*

| Parameter        | Type           | Description  |
| ------------- |:-------------:| :-----|
| options *(optional)*     | object | Override options set in the [config](#configbaseurl). |

Example:
```javascript
uberApiService.getUserProfile().then(function(userProfileData) {
    console.log(userProfileData);
}, function(errorData) {
    console.log(errorData);
});
```

####`makeRequest`
Issues a `POST` request to the `/v1/requests` [endpoint](https://developer.uber.com/v1/endpoints/#id29). Return data is a request object for the specified productId, latitude/longitude range, and optional surgeConfirmationId. *Requires a request scope authorized bearerToken to be set.*

| Parameter        | Type           | Description  |
| ------------- |:-------------:| :-----|
| productId      | string | The unique ID of the product being requested. |
| startLongitude      | string, float | The beginning or "pickup" latitude. |
| startLongitude     | string, float | The beginning or "pickup" longitude. |
| endLatitude    | string, float | The final or destination latitude. |
| endLongitude    | string, float | The final or destination longitude. |
| surgeConfirmationId *(optional)*   | string | The unique identifier of the surge session for a user. Required when returned from a 409 Conflict response on previous POST attempt. |
| options *(optional)*     | object | Override options set in the [config](#configbaseurl). |

Example:
```javascript
uberApiService.makeRequest('a1111c8c-c720-46c3-8534-2fcdd730040d', 37.775818, -122.418028, 37.8, -122.5).then(function(requestData) {
    console.log(requestData);
}, function(errorData) {
    console.log(errorData);
});
```

####`getRequestDetails`
Issues a `GET` request to the `/v1/requests/{request_id}` [endpoint](https://developer.uber.com/v1/endpoints/#id32) and returns a request details object based on the specified requestId. *Requires a request scope authorized bearerToken to be set.*

| Parameter        | Type           | Description  |
| ------------- |:-------------:| :-----|
| requestId      | string | Unique identifier representing a Request. |
| options *(optional)*     | object | Override options set in the [config](#configbaseurl). |

####`cancelRequest`
Issues a `DELETE` request to the `/v1/requests/{request_id}` [endpoint](https://developer.uber.com/v1/endpoints/#id37). A status code of HTTP 204 indicates a successful request. *Requires a request scope authorized bearerToken to be set.*

| Parameter        | Type           | Description  |
| ------------- |:-------------:| :-----|
| requestId      | string | Unique identifier representing a Request. |
| options *(optional)*     | object | Override options set in the [config](#configbaseurl). |

####`getRequestMap`
Issues a `GET` request to the `/v1/requests/{request_id}/map` [endpoint](https://developer.uber.com/v1/endpoints/#id42) and returns a request map object containing a link to a map with a visual representation of a Request. *Requires a request scope authorized bearerToken to be set.*

| Parameter        | Type           | Description  |
| ------------- |:-------------:| :-----|
| requestId      | string | Unique identifier representing a Request. |
| options *(optional)*     | object | Override options set in the [config](#configbaseurl). |
