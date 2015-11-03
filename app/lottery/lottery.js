  'use strict';

  angular.module('myApp.lottery', ['ngRoute'])

  .config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/leagues/:leagueId/lotteries/:lotteryId', {
      templateUrl: 'lottery/lottery.html',
      controller: 'LotteryCtrl'
    });
  }])

  .controller('LotteryCtrl', ['$scope', '$routeParams', '$location', '$http', function($scope, $routeParams, $location, $http) {
    if (Object.keys(authdata).length>0) {
      var myBowler;

      $scope.leagueId = $routeParams.leagueId;
      $scope.lotteryId = $routeParams.lotteryId;

      $http.defaults.headers.common['Authorization'] = 'Basic ' + authdata;
      $http.get(baseUrl + "/leagues/" + $scope.leagueId + "/lotteries/" + $scope.lotteryId + "/tickets").success(function(response) {
        $scope.tickets = response;
        $scope.numTickets = Object.keys(response).length;
        $http.get(baseUrl + "/bowlers").success(function(response) {
          $scope.bowlers = response;
          for (var sale in $scope.tickets) {
            myBowler = _.findWhere($scope.bowlers, { id: $scope.tickets[sale].bowler_id});
            $scope.tickets[sale].bowler_name = myBowler.name;
          }
          $http.get(baseUrl + "/leagues/" + $scope.leagueId + "/lotteries/" + $scope.lotteryId).success(function(response) {
            $scope.payout = response.payout;
          })
        });
      });
    } else {
      $location.path('/login');
    }

    $scope.select = function() {
      console.log('select pressed');
      $http.get(baseUrl + "/leagues/" + $scope.leagueId + "/lotteries/" + $scope.lotteryId + "/roll").success(function(response) {
        $location.path("/leagues/" + $scope.leagueId + "/lotteries/" + $scope.lotteryId );
      });
    }

  }]);
