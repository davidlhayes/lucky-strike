  'use strict';

  angular.module('myApp.lottery', ['ngRoute'])

  .config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/lottery', {
      templateUrl: 'lottery/lottery.html',
      controller: 'LotteryCtrl'
    });
  }])

  .controller('LotteryCtrl', ['$scope', '$http', function($scope, $http) {

    var leagueId = 244;
    var lotteryId = 572;
    var email = "david@davidhayes.us";
    var password = "pass1234";
    var baseUrl = "http://bowling-api.nextcapital.com/api/";
    var authdata = btoa(email + ':' + password);
    $http.defaults.headers.common['Authorization'] = 'Basic ' + authdata;
    $http.get(baseUrl + "/leagues/" + leagueId + "/lotteries/" + lotteryId + "/tickets" ).success(function(response) {
      console.log(response);
      $scope.tickets = response;
      $scope.numTickets = Object.keys(response).length;
      $http.get(baseUrl + "/bowlers").success(function(response) {
        $scope.bowlers = response;
        for (var sale in $scope.tickets) {
          
        };
      });
    });
  }]);
