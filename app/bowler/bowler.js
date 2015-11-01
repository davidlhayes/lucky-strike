  'use strict';

  angular.module('myApp.bowler', ['ngRoute'])

  .config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/bowler', {
      templateUrl: 'bowler/bowler.html',
      controller: 'BowlerCtrl'
    });
  }])

  .controller('BowlerCtrl', ['$scope', '$http', function($scope, $http) {

      var myId = 191;

      $scope.user_id = 524;
      $scope.name = 'Brian May';
      $scope.leagues = [
        { name: 'Cool Cats', winnings: 24 },
        { name: 'Red Robins', winnings: 52 },
        { name: 'Fred Flintstones', winnings: 0 }
      ]
      $scope.total = 76;

  }]);
