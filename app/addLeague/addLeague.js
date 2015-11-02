  'use strict';

  angular.module('myApp.addLeague', ['ngRoute'])

  .config(['$routeProvider', function($routeProvider, $routeParams) {
    $routeProvider.when('/addLeague', {
      templateUrl: 'addLeague/addLeague.html',
      controller: 'AddLeagueCtrl'
    });
  }])

  .controller('AddLeagueCtrl', ['$scope', '$routeParams', '$http', '$location', function($scope, $routeParams, $http, $location) {

    if (Object.keys(authdata).length>0) {
      $scope.addLeague = function() {
        $http.defaults.headers.common['Authorization'] = 'Basic ' + authdata;
        $http.post(baseUrl + "/leagues", {name: $scope.name} ).success(function(response) {
          console.log(response);
          $location.path('/leagues');
          });
      }
    } else {
      $location.path('/login');
    }
  }]);
