  'use strict';

  angular.module('myApp.lottery', ['ngRoute'])

  .config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/leagues/:leagueId/lotteries/:lotteryId', {
      templateUrl: 'lottery/lottery.html',
      controller: 'LotteryCtrl'
    });
  }])

  .controller('LotteryCtrl', ['$scope', '$routeParams', '$http', function($scope, $routeParams, $http) {

    var myBowler;
    console.log($routeParams);
    $scope.leagueId = $routeParams.leagueId;
    $scope.lotteryId = $routeParams.lotteryId;
    var email = "david@davidhayes.us";
    var password = "pass1234";
    var baseUrl = "http://bowling-api.nextcapital.com/api/";
    var authdata = btoa(email + ':' + password);
    $http.defaults.headers.common['Authorization'] = 'Basic ' + authdata;
    $http.get(baseUrl + "/leagues/" + $scope.leagueId + "/lotteries/" + $scope.lotteryId + "/tickets").success(function(response) {
      // console.log(response);
      $scope.tickets = response;
      $scope.numTickets = Object.keys(response).length;
      $http.get(baseUrl + "/bowlers").success(function(response) {
        $scope.bowlers = response;
        for (var sale in $scope.tickets) {
          myBowler = _.findWhere($scope.bowlers, { id: $scope.tickets[sale].bowler_id});
          $scope.tickets[sale].bowler_name = myBowler.name;
        }
        $http.get(baseUrl + "leagues/" + $scope.leagueId + "/lotteries/" + $scope.lotteryId).success(function(response) {
          $scope.payout = response.payout;
        })
      });
    });
  }]);
