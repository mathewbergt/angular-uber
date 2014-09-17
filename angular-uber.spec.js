'use strict';

describe('mbUber', function() {
  var mbUber;

  beforeEach(module('mbergt.uber'));

  beforeEach(function () {

  });

  afterEach(function() {

  });

  describe('#public-method-definitions', function () {

    beforeEach(inject(function(_mbUber_) {
      mbUber = _mbUber_();
    }));

    it('should be defined', function() {
      expect(mbUber).toBeDefined();
    });

    it('should have a method setBaseUrl()', function () {
      expect(mbUber.setBaseUrl).toBeDefined();
    });

    it('should have a method getBaseUrl()', function () {
      expect(mbUber.getBaseUrl).toBeDefined();
    });

    it('should have a method setVersion()', function () {
      expect(mbUber.setVersion).toBeDefined();
    });

    it('should have a method getVersion()', function () {
      expect(mbUber.getVersion).toBeDefined();
    });

    it('should have a method setServerToken()', function () {
      expect(mbUber.setServerToken).toBeDefined();
    });

    it('should have a method getServerToken()', function () {
      expect(mbUber.getServerToken).toBeDefined();
    });

    it('should have a method setBearerToken()', function () {
      expect(mbUber.setBearerToken).toBeDefined();
    });

    it('should have a method getBearerToken()', function () {
      expect(mbUber.getBearerToken).toBeDefined();
    });

    it('should have a method setUseBearerToken()', function () {
      expect(mbUber.setUseBearerToken).toBeDefined();
    });

    it('should have a method getUseBearerToken()', function () {
      expect(mbUber.getUseBearerToken).toBeDefined();
    });

    it('should have a method setClientId()', function () {
      expect(mbUber.setClientId).toBeDefined();
    });

    it('should have a method getClientId()', function () {
      expect(mbUber.getClientId).toBeDefined();
    });

    it('should have a method setSandbox()', function () {
      expect(mbUber.setSandbox).toBeDefined();
    });

    it('should have a method getSandbox()', function () {
      expect(mbUber.getSandbox).toBeDefined();
    });

    it('should have a method setSandboxBaseUrl()', function () {
      expect(mbUber.setSandboxBaseUrl).toBeDefined();
    });

    it('should have a method getSandboxBaseUrl()', function () {
      expect(mbUber.getSandboxBaseUrl).toBeDefined();
    });

    it('should have a method setClientId()', function () {
      expect(mbUber.setClientId).toBeDefined();
    });

    it('should have a method getClientId()', function () {
      expect(mbUber.getClientId).toBeDefined();
    });

    it('should have a method getProducts()', function () {
      expect(mbUber.getProducts).toBeDefined();
    });

    it('should have a method getProduct()', function () {
      expect(mbUber.getProduct).toBeDefined();
    });

    it('should have a method getPriceEstimates()', function () {
      expect(mbUber.getPriceEstimates).toBeDefined();
    });

    it('should have a method getTimeEstimates()', function () {
      expect(mbUber.getTimeEstimates).toBeDefined();
    });

    it('should have a method getPromotions()', function () {
      expect(mbUber.getPromotions).toBeDefined();
    });

    it('should have a method getHistory()', function () {
      expect(mbUber.getHistory).toBeDefined();
    });

    it('should have a method getUserProfile()', function () {
      expect(mbUber.getUserProfile).toBeDefined();
    });

    it('should have a method makeRequest()', function () {
      expect(mbUber.makeRequest).toBeDefined();
    });

    it('should have a method getRequestDetails()', function () {
      expect(mbUber.getRequestDetails).toBeDefined();
    });

    it('should have a method getRequestEstimate()', function () {
      expect(mbUber.getRequestEstimate).toBeDefined();
    });

    it('should have a method cancelRequest()', function () {
      expect(mbUber.cancelRequest).toBeDefined();
    });

    it('should have a method getRequestMap()', function () {
      expect(mbUber.getRequestMap).toBeDefined();
    });

    it('should have a method getRequestReceipt()', function () {
      expect(mbUber.getRequestReceipt).toBeDefined();
    });

  });

  describe('#config', function () {
    var $httpBackend,
        UberInstance;

    beforeEach(inject(function(_mbUber_, _$httpBackend_) {
      UberInstance = _mbUber_;
      $httpBackend = _$httpBackend_;
      jasmine.getJSONFixtures().fixturesPath = 'base/mock';
    }));

    afterEach(function(){
      $httpBackend.verifyNoOutstandingExpectation();
      $httpBackend.verifyNoOutstandingRequest();
    });

    it('should throw if an endpoint is called with serverToken and bearerToken undefined', function () {
      var mbUber = new UberInstance();

      expect(function() {
        mbUber.getProducts(37.775818, -122.418028);
      }).toThrow();
    });

    it('should throw if a OAuth endpoint is called with bearerToken undefined', function () {
      var mbUber = new UberInstance();

      expect(function() {
        mbUber.getHistory(0, 5);
      }).toThrow();
    });

    it('should throw if option useBearerToken is true but bearerToken undefined', function () {
      var mbUber = new UberInstance({
        useBearerToken: true
      });

      expect(function() {
        mbUber.getHistory(0, 5);
      }).toThrow();
    });

  });

  describe('#getters-and-setters', function () {
    var $httpBackend,
        mbUber;

    beforeEach(inject(function(_mbUber_, _$httpBackend_) {
      mbUber = new _mbUber_();
      $httpBackend = _$httpBackend_;
      jasmine.getJSONFixtures().fixturesPath = 'base/mock';
    }));

    afterEach(function(){
      $httpBackend.verifyNoOutstandingExpectation();
      $httpBackend.verifyNoOutstandingRequest();
    });

    it('should throw if an endpoint is called with serverToken and bearerToken undefined', function () {
      expect(function() {
        mbUber.getProducts(37.775818, -122.418028);
      }).toThrow();
    });

    it('should throw if a OAuth endpoint is called with bearerToken undefined', function () {
      expect(function() {
        mbUber.getHistory(0, 5);
      }).toThrow();
    });

    it('should throw if option useBearerToken is true but bearerToken undefined', function () {
      mbUber.setUseBearerToken(true);

      expect(function() {
        mbUber.getHistory(0, 5);
      }).toThrow();
    });

    it('should throw if option sandbox is true but sandboxBaseUrl undefined', function () {
      mbUber.setServerToken('MY_TEST_SERVER_TOKEN');
      mbUber.setSandbox(true);
      mbUber.setSandboxBaseUrl(null);

      expect(function() {
        mbUber.getProducts(37.775818, -122.418028);
      }).toThrow();
    });

    it('should throw if baseUrl undefined', function () {
      mbUber.setServerToken('MY_TEST_SERVER_TOKEN');
      mbUber.setBaseUrl(null);

      expect(function() {
        mbUber.getProducts(37.775818, -122.418028);
      }).toThrow();
    });

    it('should throw if version undefined', function () {
      mbUber.setServerToken('MY_TEST_SERVER_TOKEN');
      mbUber.setVersion(null);

      expect(function() {
        mbUber.getProducts(37.775818, -122.418028);
      }).toThrow();
    });

  });

  describe('#method-options', function () {
    var $httpBackend,
        mbUber;

    beforeEach(inject(function(_mbUber_, _$httpBackend_) {
      mbUber = new _mbUber_();
      $httpBackend = _$httpBackend_;
      jasmine.getJSONFixtures().fixturesPath = 'base/mock';
    }));

    afterEach(function(){
      $httpBackend.verifyNoOutstandingExpectation();
      $httpBackend.verifyNoOutstandingRequest();
    });

    it('should throw if an endpoint is called with serverToken and bearerToken undefined', function () {
      expect(function() {
        mbUber.getProducts(37.775818, -122.418028, {
          serverToken: null,
          bearerToken: null
        });
      }).toThrow();
    });

    it('should throw if a OAuth endpoint is called with bearerToken undefined', function () {
      expect(function() {
        mbUber.getHistory(0, 5, {
          bearerToken: null
        });
      }).toThrow();
    });

    it('should throw if option useBearerToken is true but bearerToken undefined', function () {
      mbUber.setUseBearerToken(true);

      expect(function() {
        mbUber.getHistory(0, 5, {
          bearerToken: null
        });
      }).toThrow();
    });

    it('should throw if option sandbox is true but sandboxBaseUrl undefined', function () {
      mbUber.setServerToken('MY_TEST_SERVER_TOKEN');
      mbUber.setSandbox(true);
      mbUber.setSandboxBaseUrl(null);

      expect(function() {
        mbUber.getProducts(37.775818, -122.418028, {
          sandboxBaseUrl: null
        });
      }).toThrow();
    });

    it('should throw if baseUrl undefined', function () {
      mbUber.setServerToken('MY_TEST_SERVER_TOKEN');
      mbUber.setBaseUrl(null);

      expect(function() {
        mbUber.getProducts(37.775818, -122.418028, {
          baseUrl: null
        });
      }).toThrow();
    });

    it('should throw if version undefined', function () {
      mbUber.setServerToken('MY_TEST_SERVER_TOKEN');
      mbUber.setVersion(null);

      expect(function() {
        mbUber.getProducts(37.775818, -122.418028, {
          version: null
        });
      }).toThrow();
    });


  });

  describe('#api-calls', function () {
    var $httpBackend,
        mbUber,
        api = 'https://api.uber.com',
        version = '/v1/';

    beforeEach(inject(function(_mbUber_, _$httpBackend_) {
      mbUber = new _mbUber_();
      $httpBackend = _$httpBackend_;
      jasmine.getJSONFixtures().fixturesPath = 'base/mock';
    }));

    afterEach(function(){
      $httpBackend.verifyNoOutstandingExpectation();
      $httpBackend.verifyNoOutstandingRequest();
    });

    it('should call the /v1/products endpoint and return an array of products', function () {
      var result,
          api = 'https://api.uber.com',
          version = '/v1/',
          queryString  = '?latitude=37.775818';
          queryString += '&longitude=-122.418028';

      mbUber.setServerToken('MY_TEST_SERVER_TOKEN');

      $httpBackend.when('GET', api + version + 'products' + queryString)
        .respond(getJSONFixture('products.json'));

      mbUber.getProducts(37.775818, -122.418028)
        .then(function (data) {
          result = data;
        });

      $httpBackend.flush();

      expect(result).toBeDefined();
      expect(result.products).toBeDefined();
      expect(result.products).toBeArrayOfSize(5);
      expect(result.products[0]).toHaveMember('product_id');
    });

    it('should call the /v1/products/{product_id} endpoint and return a product object', function () {
      var result;

      mbUber.setServerToken('MY_TEST_SERVER_TOKEN');

      $httpBackend.when('GET', api + version + 'products/TEST_PRODUCT_ID')
        .respond(getJSONFixture('products.product_id.json'));

      mbUber.getProduct('TEST_PRODUCT_ID')
        .then(function (data) {
          result = data;
        });

      $httpBackend.flush();

      expect(result).toBeDefined();
      expect(result).toBeNonEmptyObject();
      expect(result).toHaveMember('product_id');
    });

    it('should call the /v1/estimates/price endpoint and return a result', function () {
      var result,
          queryString  = '?end_latitude=37.8';
          queryString += '&end_longitude=-122.5';
          queryString += '&start_latitude=37.775818';
          queryString += '&start_longitude=-122.418028';

      mbUber.setServerToken('MY_TEST_SERVER_TOKEN');

      $httpBackend.when('GET', api + version + 'estimates/price' + queryString)
        .respond(getJSONFixture('estimates.price.json'));

      mbUber.getPriceEstimates(37.775818, -122.418028, 37.8, -122.5)
        .then(function (data) {
          result = data;
        });

      $httpBackend.flush();

      expect(result).toBeDefined();
    });

    it('should call the /v1/estimates/time endpoint and return a result', function () {
      mbUber.setServerToken('MY_TEST_SERVER_TOKEN');

      var result,
          queryString  = '?start_latitude=37.775818';
          queryString += '&start_longitude=-122.418028';

      $httpBackend.when('GET', api + version + 'estimates/time' + queryString)
        .respond(getJSONFixture('estimates.time.json'));

      mbUber.getTimeEstimates(37.775818, -122.418028)
        .then(function (data) {
          result = data;
        });

      $httpBackend.flush();

      expect(result).toBeDefined();
    });

    it('should call the /v1/promotions endpoint and return a result', function () {
      mbUber.setBearerToken('MY_TEST_BEARER_TOKEN');

      var result,
          queryString  = '?end_latitude=37.8';
          queryString += '&end_longitude=-122.5';
          queryString += '&start_latitude=37.775818';
          queryString += '&start_longitude=-122.418028';

      $httpBackend.when('GET', api + version + 'promotions' + queryString)
        .respond(getJSONFixture('estimates.time.json'));

      mbUber.getPromotions(37.775818, -122.418028, 37.8, -122.5)
        .then(function (data) {
          result = data;
        });

      $httpBackend.flush();

      expect(result).toBeDefined();
    });

    // it('should spy on the api', function () {
    //   spyOn(mbUber, 'api');

    //   mbUber.getPromotions(37.775818, -122.418028, 37.8, -122.5)
    //     .then(function (data) {
    //       result = data;
    //     });

    //   expect(mbUber.api).toHaveBeenCalled();
    // });

    it('should call the /v1.2/history endpoint and return a result', function () {
      var queryString  = '?limit=5';
          queryString += '&offset=0';

      $httpBackend.when('GET', api + '/v1.2/history' + queryString)
        .respond(getJSONFixture('history.json'));

      var result;

      mbUber.getHistory(0, 5, {
        bearerToken: 'MY_TEST_BEARER_TOKEN'
      }).then(function (data) {
        result = data;
      });

      $httpBackend.flush();

      expect(result).toBeDefined();
    });

  });

});