  'use strict';

  angular.module('myApp.authentication')

  .controller('LoginCtrl',
    ['$scope', '$http', '$location', '$route', function($scope, $http, $location, $route) {

    $scope.message = loginMessage;

    // this is a single-session authentication -- nothing saved server side, no cookie
    $scope.login = function() {
      $scope.dataLoading = true;
      $scope.passwordError = "password error";

      var loginUrl = 'http://bowling-api.nextcapital.com/api/login';
      authdata = btoa($scope.email + ':' + $scope.password);
      console.log($scope.email,$scope.password,authdata);
      $http.defaults.headers.common['Authorization'] = 'Basic ' + authdata;
      $http.post(loginUrl, { email: $scope.email, password: $scope.password }).success(function(response) {
        if (response.email===$scope.email) {
          console.log($location.path());
          $location.path('/leagues');
        } else {
          $scope.dataLoading = false;
        }
        loginMessage = "";
      }).error(function(error) {
        console.log(error.error);
        loginMessage = "invalid email/password combination"
        $route.reload();
      });
    };

    // this simple function clears the credentials and presents the login form
    $scope.logout = function() {
      authdata = {};
      $location.path('/login');
    }

    // the only difference between this and the login function is the api endpoint
    $scope.register = function() {
      $scope.dataLoading = true;
      var loginUrl = 'http://bowling-api.nextcapital.com/api/users';
      authdata = btoa($scope.email + ':' + $scope.password);
      console.log($scope.email,$scope.password,authdata);
      $http.defaults.headers.common['Authorization'] = 'Basic ' + authdata;
      $http.post(loginUrl, { email: $scope.email, password: $scope.password }).success(function(response) {
        if (response.email===$scope.email) {
          console.log($location.path());
          $location.path('/leagues');
        } else {
          $scope.dataLoading = false;
        }
      }).error(function(error) {
        console.log('you are not allowed');
      });
    };

    $scope.reset = function() {
      $location.path('/login');
    }

  }]);
