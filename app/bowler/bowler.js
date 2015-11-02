  'use strict';

  angular.module('myApp.bowler', ['ngRoute'])

  .config(['$routeProvider', function($routeProvider, $routeParams) {
    $routeProvider.when('/bowler/:bowlerId', {
      templateUrl: 'bowler/bowler.html',
      controller: 'BowlerCtrl'
    });
  }])

  .controller('BowlersCtrl', ['$scope', '$routeParams', '$http', '$location', function($scope, $routeParams, $http, $location) {
    if (Object.keys(authdata).length>0) {
      $http.defaults.headers.common['Authorization'] = 'Basic ' + authdata;

      $scope.bowlerId = $routeParams.bowlerId;

      $http.get(baseUrl + "/bowler/" + $scope.bowlerId).success(function(response) {
      console.log(response);
      $scope.bowlers = response;
      });
    } else {
      $location.path('/login');
    }

  }]);
