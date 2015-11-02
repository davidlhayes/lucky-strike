'use strict';

  // not certain why these needed to be declared here. Undefined errors appear otherwise
  angular.module('myApp.authentication', ['ngRoute']);
  angular.module('myApp.lottery', ['ngRoute']);
  angular.module('myApp.winner', ['ngRoute']);
  angular.module('myApp.addBowler', ['ngRoute']);
  // our API home base
  var baseUrl = "http://bowling-api.nextcapital.com/api/";
  // authentication data -- using a global variable (lost on refresh)
  var authdata = {};
  // preserve login error message through route reload;
  var loginMessage = "";

// Declare app level module which depends on views, and components
  angular.module('myApp', [
    'ngRoute',
    'myApp.authentication',
    'myApp.leagues',
    'myApp.league',
    'myApp.bowlers',
    'myApp.addBowler',
    'myApp.addLeague',
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
  // .run(['$rootScope', '$location', '$http',
  //   function($rootScope, $location, $http) {
  //     // keep user logged in after page refresh
  //     $rootScope.globals = $cookies.get('globals') || {};
  //     if ($rootScope.globals.currentUser) {
  //       $http.defaults.headers.common['Authorization'] = 'Basic ' + $rootScope.globals.currentUser.authdata;
  //     }
  //
  //     $rootScope.$on('$locationChangeStart', function(event, next, current) {
  //       // redirect to login page if not logged in
  //       var openPages = ['/login', '/register'];
  //       var restrictedPage = openPages.indexOf($location.path()) === -1;
  //       var loggedIn = $rootScope.globals.currentUser;
  //       var loggedIn = true;
  //       if (restrictedPage && !loggedIn) {
  //         $location.path('/login');
  //       }
  //     });
  // }]);
