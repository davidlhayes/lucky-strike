  'use strict';

  angular.module('myApp.winner', ['ngRoute'])

  .config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/leagues/:leagueId/lotteries/:lotteryId/bowlers/:bowlerId', {
      templateUrl: 'winner/winner.html',
      controller: 'WinnerCtrl'
    });
  }])

  .controller('WinnerCtrl', ['$scope', '$routeParams', '$location', '$http', '$route', function($scope, $routeParams, $location, $http, $route) {
    if (Object.keys(authdata).length>0) {

      $scope.dataLoading = true;
      $http.defaults.headers.common['Authorization'] = 'Basic ' + authdata;

      $scope.leagueId = $routeParams.leagueId;
      $scope.lotteryId = $routeParams.lotteryId;
      $scope.bowlerId = $routeParams.bowlerId;
      // look up bower name from url-supplied bowler Id
      // bowler Id in the url is only used to indicate this view
      // a more rigorous approach would check with the API to get the winner ID,
      // but that's more API calls
      $http.get(baseUrl + "/bowlers/" + $scope.bowlerId).success(function(response) {
        $scope.bowler_name = response.name;
      // If a lottery has paid out, the payout is displayed and the roll buttons are not.
      // grab the jackpot balance
        $http.get(baseUrl + 'leagues/' + $scope.leagueId + '/lotteries/' + $scope.lotteryId).success(function(response) {
          $scope.balance = response.balance;
          // get the payout
          $http.get(baseUrl + 'leagues/' + $scope.leagueId + '/lotteries/' + $scope.lotteryId + '/roll').success(function(response) {
              $scope.payout = response.payout;
              $scope.balance -= response.payout;
              $scope.showPayout = (response.payout != null);
              $scope.dataLoading = false;
            });
        });
      });
    } else {
      $location.path("/login");
    }

    // function to produce indices for roll buttons
    $scope.range = function(n) {
      return new Array(n+1);
    }

    // function to record number of pins knocked down, 10 wins whole jackpot, any
    // other number wins 1/10 of the jackpot (all handled by the API)
    $scope.roll = function(pinCount) {
      console.log(pinCount);
      console.log($scope.leagueId);
      console.log($scope.lotteryId);
      $http.put(baseUrl + 'leagues/' + $scope.leagueId + '/lotteries/' + $scope.lotteryId + '/roll',
        { pin_count: pinCount}).success(function(response) {
          $route.reload();
          return true;
        });
    }

  }]);
