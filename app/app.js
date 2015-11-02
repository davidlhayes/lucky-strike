'use strict';

  // not certain why these needed to be declared here. Undefined errors appear otherwise
  angular.module('myApp.authentication', ['ngRoute']);
  angular.module('myApp.lottery', ['ngRoute']);
  angular.module('myApp.winner', ['ngRoute']);
  // our API home base
  var baseUrl = "http://bowling-api.nextcapital.com/api/";
  // authentication data -- using a global variable (lost on refresh)
  var authdata = {};

// Declare app level module which depends on views, and components
  angular.module('myApp', [
    'ngRoute',
    'ngCookies',
    'myApp.authentication',
    'myApp.leagues',
    'myApp.league',
    'myApp.bowlers',
    'myApp.bowler',
    'myApp.lottery',
    'myApp.winner',
    'myApp.version'
  ]).
  config(['$routeProvider', function($routeProvider) {
    $routeProvider
      .when('/login', {
        controller: 'LoginCtrl',
        templateUrl: 'authentication/login.html',
        hideMenus: true
      })

      .when('/register', {
        controller: 'RegisterController',
        templateUrl: 'login/login.html',
      })

      .when('/', {
        controller: 'LeaguesCtrl',
        templateUrl: 'leagues/leagues.html'
      })

      .otherwise({redirectTo: '/login'});
  }])
  .run(['$rootScope', '$location', '$cookies', '$http',
    function($rootScope, $location, $cookies, $http) {
      // keep user logged in after page refresh
      $rootScope.globals = $cookies.get('globals') || {};
      if ($rootScope.globals.currentUser) {
        $http.defaults.headers.common['Authorization'] = 'Basic ' + $rootScope.globals.currentUser.authdata;
      }

      $rootScope.$on('$locationChangeStart', function(event, next, current) {
        // redirect to login page if not logged in
        var openPages = ['/login', '/register'];
        var restrictedPage = openPages.indexOf($location.path()) === -1;
        var loggedIn = $rootScope.globals.currentUser;
        var loggedIn = true;
        if (restrictedPage && !loggedIn) {
          $location.path('/login');
        }
      });
  }]);
