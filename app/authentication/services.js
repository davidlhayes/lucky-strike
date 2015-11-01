  'use strict';

  angular.module('myApp.authentication', ['ngCookies'])

  .factory('AuthenticationService',
    ['$http', '$cookieStore',  '$rootScope',
    function( $http, $cookieStore,  $rootScope) {
      var service = {};

      service.Login = function(email, password, callback) {
        console.log('attempting to log in');
        var loginUrl = 'http://bowling-api.nextcapital.com/api/login';
        var authdata = btoa(email + ':' + password);
        $http.defaults.headers.common['Authorization'] = 'Basic ' + authdata;
        $http.post(loginUrl, { email: email, password: password })
          .success(function(response) {
            AuthenticationService.SetCredentials($scope.email, $scope.password);
            $location.path('#/leagues');
            $rootScope.globals = {
              currentUser: {
                email: email,
                authdata: authdata
              }
            }
          }).error(function(error) {
            console.log('error');
            console.log(error);
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
