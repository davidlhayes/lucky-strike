'use strict';

angular.module('myApp.league', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/league', {
    templateUrl: 'league/league.html',
    controller: 'LeagueCtrl'
  });
}])

.controller('LeagueCtrl', ['$scope', '$http', function($scope, $http) {

  var myId = 191;
  $scope.name = 'Devil Dogs'

  $scope.bowlers = [
    { bowler_id: 1, bowler_name: 'Brian May'},
    { bowler_id: 2, bowler_name: 'Freddie Mercury'},
    { bowler_id: 5, bowler_name: 'Pete Best'},

  ];

  $scope.lotteries = [
    { lottery_id: 1, winner: 'Pete Best', payout: 34.53, jackpot: 100.00},
    { lottery_id: 2, winner: 'Pete Best', payout: 100.00, jackpot: 0.00},
    { lottery_id: 3, winner: 'Freddie Mercury', payout: 10.00, jackpot: 40.00}
  ];

  $scope.total = 144.53;

}]);
