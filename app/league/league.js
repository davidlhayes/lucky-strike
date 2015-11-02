'use strict';

angular.module('myApp.league', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/leagues/:leagueId', {
    templateUrl: 'league/league.html',
    controller: 'LeagueCtrl'
  });
}])

.controller('LeagueCtrl', ['$scope', '$routeParams', '$http', '$location', function($scope, $routeParams, $http, $location) {
  if (Object.keys(authdata).length>0) {
    $http.defaults.headers.common['Authorization'] = 'Basic ' + authdata;

    $scope.leagueId = $routeParams.leagueId;

    $http.get(baseUrl + "/leagues/" + $scope.leagueId).success(function(response) {
      $scope.id = response.id;
      $scope.name = response.name;
      $http.get(baseUrl + "/leagues/" + $scope.leagueId + "/bowlers").success(function(response) {
        $scope.bowlers = response;
        console.log(response);
        $http.get(baseUrl + "/leagues/" + $scope.leagueId + "/lotteries").success(function(response) {
          console.log(response);
          $scope.lotteries = response;
        });
      });
    });
  } else {
    $location.path("/login");
  }

  $scope.buy = function(bowlerId) {
    console.log('bowlerId');
    console.log(bowlerId);
    $http.defaults.headers.common['Authorization'] = 'Basic ' + authdata;
    $http.get(baseUrl + "/leagues/" + $scope.leagueId + "/lotteries").success(function(response) {
      var lottery = _.findWhere(response, { payout: null });
      console.log(lottery.id,bowlerId);
      $http.post(baseUrl + "/leagues/" + $scope.leagueId + "/lotteries/" + lottery.id + "/tickets",
        {bowler_id: bowlerId})
        .success(function(response) {
          console.log(response);
          $location.path("/leagues/" + $scope.leagueId + "/lotteries/" + lottery.id)
        });
    });
  }

}]);
