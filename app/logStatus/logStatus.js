  'use strict';

  angular.module('myApp.logStatus', ['ngRoute'])

  .controller('LogStatusCtrl', ['$scope', '$location', function($scope, $location) {
    $scope.authdata = authdata;
    if ($location.path()=='/login') {
      $scope.loggedIn = false;
    } else {
      $scope.loggedIn = true;
    }

    $scope.logout = function() {
      authdata = {};
      userEmail = null;
      $location.path('/login');
    }

  }]);
