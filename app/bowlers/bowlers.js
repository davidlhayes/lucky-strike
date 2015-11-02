  'use strict';

  angular.module('myApp.bowlers', ['ngRoute'])
  .config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/bowlers', {
      templateUrl: 'bowlers/bowlers.html',
      controller: 'BowlersCtrl'
    });
  }])

  .controller('BowlersCtrl', ['$scope', '$http', '$location', function($scope, $http, $location) {
    if (Object.keys(authdata).length>0) {
      $http.defaults.headers.common['Authorization'] = 'Basic ' + authdata;
      $http.get(baseUrl + "/bowlers").success(function(response) {
      console.log(response);
      $scope.bowlers = response;
      });
    } else {
      $location.path('/login');
    }

  }]);
