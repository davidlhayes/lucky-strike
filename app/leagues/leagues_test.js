'use strict';

describe('LeaguesCtrl', function() {
    var scope, httpBackend, createController;

    beforeEach(module('myApp.leagues'));

    beforeEach(inject(function($rootScope, $httpBackend, $controller) {
        httpBackend = $httpBackend;
        scope = $rootScope.$new();

        createController = function() {
            return $controller('LeaguesCtrl', {
                '$scope': scope
            });
        };
    }));

    afterEach(function() {
        httpBackend.verifyNoOutstandingExpectation();
        httpBackend.verifyNoOutstandingRequest();
    });

    it('should get leagues data from the backend', function() {
        var controller = createController();
        scope.urlToScrape = 'success.com';

        httpBackend.expect('GET', '/slurp?urlToScrape=http:%2F%2Fsuccess.com')
            .respond([
              {
                "id": 1,
                "name": 'Cool Cats'
              },
              {
                "id": 2,
                "name": 'Red Robins',
              },
              {
                "id": 3,
                "name": 'Fred Flintstones'
              }
            ]);

        // have to use $apply to trigger the $digest which will
        // take care of the HTTP request
        scope.$apply(function() {
            scope.runTest();
        });

        expect(scope.parseOriginalUrlStatus).toEqual('calling');

        httpBackend.flush();

        expect(scope.retrievedUrls).toEqual(["http://www.google.com", "http://angularjs.org", "http://amazon.com"]);
        expect(scope.parseOriginalUrlStatus).toEqual('waiting');
        expect(scope.doneScrapingOriginalUrl).toEqual(true);
    });
});
