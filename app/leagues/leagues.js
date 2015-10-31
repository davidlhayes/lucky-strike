'use strict';

angular.module('myApp.leagues', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/leagues', {
    templateUrl: 'leagues/leagues.html',
    controller: 'LeaguesCtrl'
  });
}])

.controller('LeaguesCtrl', ['$scope', '$http', function($scope, $http) {

  var myId = 191;

  $scope.leagues = [
    { id: 1, user_id: myId, name: 'Cool Cats', total: 250},
    { id: 2, user_id: myId, name: 'Red Robins', total: 125.09},
    { id: 3, user_id: myId, name: 'Devil Dogs', total: 142.14},
    { id: 4, user_id: myId, name: 'Reruns', total: 12},
    { id: 5, user_id: myId, name: 'Fred Flintstones', total: 152.12}
  ];

}]);
