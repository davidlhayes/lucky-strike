  'use strict';

  angular.module('myApp.bowlers', ['ngRoute'])

  .config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/bowlers', {
      templateUrl: 'bowlers/bowlers.html',
      controller: 'BowlersCtrl'
    });
  }])

  .controller('BowlersCtrl', ['$scope', '$http', function($scope, $http) {

    var email = "david@davidhayes.us";
    var password = "pass1234";
    var baseUrl = "http://bowling-api.nextcapital.com/api/";
    var authdata = btoa(email + ':' + password);
    $http.defaults.headers.common['Authorization'] = 'Basic ' + authdata;
    $http.get(baseUrl + "/bowlers").success(function(response) {
      console.log(response);
      $scope.bowlers = response;
    });

  }]);
