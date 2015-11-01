'use strict';

angular.module('myApp.league', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/league', {
    templateUrl: 'league/league.html',
    controller: 'LeagueCtrl'
  });
}])

.controller('LeagueCtrl', ['$scope', '$http', function($scope, $http) {
  var leagueId = 244;
  var email = "david@davidhayes.us";
  var password = "pass1234";
  var baseUrl = "http://bowling-api.nextcapital.com/api/";
  var authdata = btoa(email + ':' + password);
  $http.defaults.headers.common['Authorization'] = 'Basic ' + authdata;
  $http.get(baseUrl + "/leagues/" + leagueId).success(function(response) {
    $scope.id = response.id;
    $scope.name = response.name;
    $http.get(baseUrl + "/leagues/" + leagueId + "/bowlers").success(function(response) {
      $scope.bowlers = response;
      console.log(response);
      $http.get(baseUrl + "/leagues/" + leagueId + "/lotteries").success(function(response) {
        console.log(response);
        $scope.lotteries = response;
      });
    });
  });

  $scope.lotteryRef = function(leagueId,lotteryId) {
    return "#/leagues/" + leagueId + "/lotteries/" + lotteryId;
  }

}]);
