  'use strict';

  angular.module('myApp.leagues', ['ngRoute'])

  .config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/leagues', {
      templateUrl: 'leagues/leagues.html',
      controller: 'LeaguesCtrl'
    });
  }])

  .controller('LeaguesCtrl', ['$scope', '$http', function($scope, $http) {

    var email = "david@davidhayes.us";
    var password = "pass1234";
    var baseUrl = "http://bowling-api.nextcapital.com/api/";
    var authdata = btoa(email + ':' + password);
    $http.defaults.headers.common['Authorization'] = 'Basic ' + authdata;
    $http.get(baseUrl + "/leagues").success(function(response) {
      console.log(response);
      $scope.leagues = response;
    });

  }]);
