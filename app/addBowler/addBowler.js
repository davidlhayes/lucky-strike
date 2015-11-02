  'use strict';

  angular.module('myApp.bowler', ['ngRoute'])

  .config(['$routeProvider', function($routeProvider, $routeParams) {
    $routeProvider.when('/addBowler', {
      templateUrl: 'addBowler/addBowler.html',
      controller: 'AddBowlerCtrl'
    });
  }])

  .controller('AddBowlerCtrl', ['$scope', '$routeParams', '$http', '$location', function($scope, $routeParams, $http, $location) {

    if (Object.keys(authdata).length>0) {

      $scope.addBowler = function(name) {
        $http.defaults.headers.common['Authorization'] = 'Basic ' + authdata;
        $http.post(baseUrl + "/bowlers", {name: name} ).success(function(response) {
          console.log(response);
          $location.path('/bowlers');
          });
      }
    } else {
      $location.path('/login');
    }
  }]);
