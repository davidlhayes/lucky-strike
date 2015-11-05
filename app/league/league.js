'use strict';

angular.module('myApp.league', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/leagues/:leagueId', {
    templateUrl: 'league/league.html',
    controller: 'LeagueCtrl'
  });
}])

.controller('LeagueCtrl', ['$scope', '$route', '$routeParams', '$http', '$location', function($scope, $route, $routeParams, $http, $location) {
  if (Object.keys(authdata).length>0) {
    $scope.dataLoading = true;
    $scope.message = "";
    $http.defaults.headers.common['Authorization'] = 'Basic ' + authdata;

    $scope.leagueId = $routeParams.leagueId;

    $http.get(baseUrl + "/leagues/" + $scope.leagueId).success(function(response) {
      $scope.id = response.id;
      $scope.leagueName = response.name;
      console.log($scope.leagueName);
      $http.get(baseUrl + "/leagues/" + $scope.leagueId + "/bowlers").success(function(response) {
        $scope.bowlers = response;
        console.log(response);
        $http.get(baseUrl + "/leagues/" + $scope.leagueId + "/lotteries").success(function(response) {
          console.log(response);
          $scope.lotteries = response;
          $scope.dataLoading = false;
          // calculate the total payout for all of this league's lotteries
          var tot = 0;
          for (var key in $scope.lotteries) {
            if ($scope.lotteries[key].payout) {   // avoid null values
              tot += $scope.lotteries[key].payout;
            }
          }
          $scope.total = tot;
        });
      });
    });
  } else {
    $location.path("/login");
  }

  $scope.buy = function(bowlerId) {
    console.log('bowlerId');
    console.log(bowlerId);
    $scope.message = "processing";
    $http.defaults.headers.common['Authorization'] = 'Basic ' + authdata;
    $http.get(baseUrl + "leagues/" + $scope.leagueId + "/lotteries").success(function(response) {
      var lottery = _.findWhere(response, { payout: null });
      console.log(lottery.id,bowlerId);
      $http.post(baseUrl + "leagues/" + $scope.leagueId + "/lotteries/" + lottery.id + "/tickets",
        {bowler_id: bowlerId}).success(function(response) {
          $http.get(baseUrl + "/leagues/" + $scope.leagueId + "/lotteries").success(function(response) {
            console.log(response);
            $scope.lotteries = response;
            $scope.dataLoading = false;
            $scope.message = "Bowler " + bowlerId + " made a successful ticket purchase"
            // calculate the total payout for all of this league's lotteries
            var tot = 0;
            for (var key in $scope.lotteries) {
              if ($scope.lotteries[key].payout) {   // avoid null values
                tot += $scope.lotteries[key].payout;
              }
            }

        });
      });
    });
  }

}]);
