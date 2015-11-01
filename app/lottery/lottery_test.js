  'use strict';

  describe('myApp.lottery module', function() {

    beforeEach(module('myApp.lottery'));

    describe('LotteryCtrl', function(){

      it('should create "leagues" model with 5 leagues', function() {
        //spec body
        var scope = {},
            ctrl = new LotteryCtrl(scope);

        expect(scope.lottery.length).toBe(5);
      });

    });
  });
