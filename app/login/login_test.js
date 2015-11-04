  'use strict';

// testing controller
describe('LoginCtrl', function() {
   var $httpBackend, $rootScope, createController, authRequestHandler;

   // Set up the module
   beforeEach(module('MyApp.login'));

   beforeEach(inject(function($injector) {
     // Set up the mock http service responses
     $httpBackend = $injector.get('$httpBackend');
     // backend definition common for all tests
     authRequestHandler = $httpBackend.when('GET', baseUrl + '/users')
                            .respond({"error": "Invalid basic HTTP authoization. Check \"Authorization\" headers."});

     // Get hold of a scope (i.e. the root scope)
     $rootScope = $injector.get('$rootScope');
     // The $controller service is used to create instances of controllers
     var $controller = $injector.get('$controller');
   //
     createController = function() {
       return $controller('LoginCtrl', {'$scope' : $rootScope });
     };
   }));
   //
  //  it("should return an error object", function() {
  //    $httpBackend.expectGET(baseUrl + '/users');
  //    var controller = createController();
  //    expect($rootScope.status).toBe('{"error": "Invalid basic HTTP authoization. Check \"Authorization\" headers."}');
  //    $httpBackend.flush();
  //  });
   //
  //  afterEach(function() {
  //    $httpBackend.verifyNoOutstandingExpectation();
  //    $httpBackend.verifyNoOutstandingRequest();
  //  });


});
