  'use strict';

  angular.module('myApp.addBowler2League', ['ngRoute'])

  .config(['$routeProvider', function($routeProvider, $routeParams) {
    $routeProvider.when('/addBowler2League', {
      templateUrl: 'addBowler2League/addBowler2league.html',
      controller: 'AddBowler2LeagueCtrl'
    });
  }])

  .controller('AddBowler2LeagueCtrl', ['$scope', '$routeParams', '$http', '$location', function($scope, $routeParams, $http, $location) {
    console.log('AddBowler2LeagueCtrl');
    if (Object.keys(authdata).length>0) {

      $scope.addBowler = function(name) {
        $http.defaults.headers.common['Authorization'] = 'Basic ' + authdata;
        $http.post(baseUrl + "/bowlers", {name: $scope.name} ).success(function(response) {
          console.log(response);
          $location.path('/bowlers');
          });
      }
    } else {
      $location.path('/login');
    }
  }]);
