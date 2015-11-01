'use strict';

  angular.module('myApp.authentication', ['ngCookies']);
  angular.module('myApp.lottery', ['ngRoute'])

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
        controller: 'HomeController',
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
        // var loggedIn = $rootScope.globals.currentUser;
        var loggedIn = true;
        if (restrictedPage && !loggedIn) {
          $location.path('/login');
        }
      });
  }]);
