  'use strict';

  describe('myApp.bowler module', function() {

    beforeEach(module('myApp.bowler'));

    describe('bowler controller', function(){

      it('should ....', inject(function($controller) {
        //spec body
        var BowlerCtrl = $controller('BowlerCtrl');
        expect(BowlerCtrl).toBeDefined();
      }));

    });
  });
