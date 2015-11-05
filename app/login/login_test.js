'use strict';

// testing controller
describe('LoginCtrl', function() {
 var $httpBackend, $rootScope, createController, authRequestHandler;

 // Set up the module
 beforeEach(module('myApp.login'));

 beforeEach(inject(function($injector) {
   // Set up the mock http service responses
   $httpBackend = $injector.get('$httpBackend');
   // backend definition common for all tests
   authRequestHandler = $httpBackend.when('GET', baseUrl + 'login')
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


    afterEach(function() {
   $httpBackend.verifyNoOutstandingExpectation();
   $httpBackend.verifyNoOutstandingRequest();
 });

 it("should return an error object", function() {
   var controller = createController();


   $httpBackend.expectPOST(baseUrl + 'login');

   $rootScope.login();

   expect($rootScope.status).toBe('{"error": "Invalid basic HTTP authoization. Check \"Authorization\" headers."}');
   $httpBackend.flush();
 });
 //


});
