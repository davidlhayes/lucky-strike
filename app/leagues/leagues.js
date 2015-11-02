  'use strict';

  angular.module('myApp.leagues', ['ngRoute'])

  .config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/leagues', {
      templateUrl: 'leagues/leagues.html',
      controller: 'LeaguesCtrl'
    });
  }])

  .controller('LeaguesCtrl', ['$scope', '$location', '$http', function($scope, $location, $http) {
    if (Object.keys(authdata).length>0) {
      $http.defaults.headers.common['Authorization'] = 'Basic ' + authdata;
      $http.get(baseUrl + "/leagues").success(function(response) {
        console.log(response);
        $scope.leagues = response;
      })
    } else {
      $location.path('/login');
    }

  }]);
