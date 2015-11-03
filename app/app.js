'use strict';

  // not certain why these needed to be declared here. Undefined errors appear otherwise
  angular.module('myApp.login', ['ngRoute']);
  angular.module('myApp.lottery', ['ngRoute']);
  angular.module('myApp.winner', ['ngRoute']);
  // our API home base
  var baseUrl = "http://bowling-api.nextcapital.com/api/";
  // authentication data -- using a global variable (lost on refresh)
  var authdata = {};
  // preserve login error message through route reload;
  var loginMessage = "";

// Declare app level module which depends on views, and components
  angular.module('myApp', [
    'ngRoute',
    'myApp.login',
    'myApp.leagues',
    'myApp.league',
    'myApp.bowlers',
    'myApp.addBowler',
    'myApp.addBowler2League',
    'myApp.addLeague',
    'myApp.lottery',
    'myApp.winner'
  ]).
  config(['$routeProvider', function($routeProvider) {
    $routeProvider
      .when('/login', {
        controller: 'LoginCtrl',
        templateUrl: 'login/login.html',
        hideMenus: true
      })

      .when('/', {
        controller: 'LeaguesCtrl',
        templateUrl: 'leagues/leagues.html'
      })

      .otherwise({redirectTo: '/login'});
  }])
