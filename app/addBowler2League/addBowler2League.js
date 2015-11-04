  'use strict';

  angular.module('myApp.addBowler2League', ['ngRoute'])

  .config(['$routeProvider', function($routeProvider, $routeParams) {
    $routeProvider.when('/leagues/:leagueId/addbowler2league', {
      templateUrl: 'addBowler2League/addBowler2league.html',
      controller: 'AddBowler2LeagueCtrl'
    });
  }])

  .controller('AddBowler2LeagueCtrl', ['$scope', '$routeParams', '$http', '$location', function($scope, $routeParams, $http, $location) {

    if (Object.keys(authdata).length>0) {

      $scope.leagueId = $routeParams.leagueId;

      $scope.addBowler = function() {
        $http.defaults.headers.common['Authorization'] = 'Basic ' + authdata;
        $http.get(baseUrl + 'bowlers').success(function(response) {
            $scope.bowlers = response;
            var bowler = _.findWhere(response,{name: $scope.name });
            $scope.bowlerId= bowler.id
            if ($scope.bowlerId) {
              $http.put(baseUrl + 'leagues/' + $scope.leagueId + '/bowlers', {bowler_id: $scope.bowlerId} ).success(function(response) {
                $location.path('/leagues/' + $scope.leagueId);
              });
            } else {
              $scope.raiseError = true;
            }
        });
      };

    } else {
      $location.path('/login');
    }
  }]);
