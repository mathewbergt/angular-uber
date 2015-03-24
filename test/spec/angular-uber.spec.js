'use strict';

describe('mbUber', function() {
  var mbUber;

  beforeEach(module('mbergt.uber'));

  beforeEach(function () {

  });

  afterEach(function() {
    
  });

  describe('#function_defs', function () {
    
    beforeEach(inject(function(_mbUber_) {
      mbUber = _mbUber_();
    }));

    it('should be defined', function() {
      expect(mbUber).toBeDefined();
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

    it('should have a method setClientId()', function () {
      expect(mbUber.setClientId).toBeDefined();
    });

    it('should have a method getClientId()', function () {
      expect(mbUber.getClientId).toBeDefined();
    });

    it('should have a method getProducts()', function () {
      expect(mbUber.getProducts).toBeDefined();
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

    it('should have a method initAuth()', function () {
      expect(mbUber.initAuth).toBeDefined();
    });

  });

describe('#function_defs', function () {
    
    beforeEach(inject(function(_mbUber_) {
      mbUber = _mbUber_();
    }));

    

  });

});