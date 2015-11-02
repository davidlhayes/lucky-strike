  'use strict';

  angular.module('myApp.winner', ['ngRoute'])

  .config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/leagues/:leagueId/lotteries/:lotteryId/bowlers/:bowlerId', {
      templateUrl: 'winner/winner.html',
      controller: 'WinnerCtrl'
    });
  }])

  .controller('WinnerCtrl', ['$scope', '$routeParams', '$location', '$http', function($scope, $routeParams, $location, $http) {
    if (Object.keys(authdata).length>0) {
      $http.defaults.headers.common['Authorization'] = 'Basic ' + authdata;

      $scope.leagueId = $routeParams.leagueId;
      $scope.lotteryId = $routeParams.lotteryId;
      $scope.bowlerId = $routeParams.bowlerId;

      $http.get(baseUrl + "/bowlers/" + $scope.bowlerId).success(function(response) {

        $scope.bowler_name = response.name;

      });

    } else {
      $location.path("/login");
    }

    $scope.roll = function(pinCount) {
      console.log(pinCount);
      console.log($scope.leagueId);
      console.log($scope.lotteryId);
      $http.put(baseUrl + 'leagues/' + $scope.leagueId + '/lotteries/' + $scope.lotteryId + '/roll',
        { pin_count: pinCount})
        .success(function(response) {
          $scope.pin_count = pin_count;
          $scope.payout = response.payout;
          console.log(response);
          return true;
        }).error(function(error) {
          console.log(error.error);
        });
    }

  }]);
