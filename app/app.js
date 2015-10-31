'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
  'ngRoute',
  'myApp.leagues',
  'myApp.league',
  'myApp.bowlers',
  'myApp.bowler',
  'myApp.version'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.otherwise({redirectTo: '/leagues'});
}]);
