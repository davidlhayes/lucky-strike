  'use strict';

  angular.module('myApp.leagues', ['ngRoute'])

  .config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/leagues', {
      templateUrl: 'leagues/leagues.html',
      controller: 'LeaguesCtrl'
    });
  }])

  .controller('LeaguesCtrl', ['$scope', '$location', '$http', function($scope, $location, $http) {
    // check to make sure only a logged-in user sees this page
    if (Object.keys(authdata).length>0) {
      $scope.dataLoading = true;
      $http.defaults.headers.common['Authorization'] = 'Basic ' + authdata;
      // get leagues data from API
      $http.get(baseUrl + "leagues").success(function(response) {
        console.log(response);
        $scope.leagues = response;
        $scope.dataLoading = false;
      })
    } else {
      $location.path('/login');
    }

  }]);
