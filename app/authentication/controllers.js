  'use strict';

  angular.module('myApp.authentication')

  .controller('LoginCtrl',
    ['$scope', '$rootScope', '$location', 'AuthenticationService',
    function($scope, $rootScope, $location, AuthenticationService) {
    // reset login status
    // AuthenticationService.ClearCredentials();

    $scope.login = function() {
      $scope.dataLoading = true;
      AuthenticationService.Login($scope.email, $scope.password, function(response) {
        if (response.success) {
          $location.path('#/');
        } else {
          $scope.error = response.message;
          $scope.dataLoading = false;
        }
      });
    };
  }]);
