'use strict';

describe('myApp.leagues module', function() {

  beforeEach(module('myApp.leagues'));

  describe('LeaguesCtrl', function(){

    it('should create "leagues" model with 5 leagues', function() {
      //spec body
      var scope = {},
          ctrl = new LeaguesCtrl(scope);

      expect(scope.leagues.length).toBe(5);
    });

  });
});
