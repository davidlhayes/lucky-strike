  'use strict';

  angular.module('myApp.authentication')

  .factory('AuthenticationService',
    ['$http', 'ngCookies', '$rootScope',
    function( $http, ngCookies, $rootScope) {
      var service = {};

      service.Login = function(email, password, callback) {

        $http.post('/login', { email: email, password: password })
          .success(function(response) {
            callback(response);
          });
      }

      service.SetCredentials = function(email, password) {

        var authdata = btoa(email + ':' + password);

        $rootScope.globals = {
          currentUser: {
            email: email,
            authdata: authdata
          }
        }

        $http.defaults.headers.common['Authorization'] = 'Basic ' + authodata;
        $cookieStore.put('globals', $rootScope.globals);

      };

      service.ClearCredentials = function() {
        $rootScope.globals = {};
        $cookieStore.remove('globals');
        $http.defaults.headers.common.Authorization = 'Basic ';
      };

      return service;


    }]);
