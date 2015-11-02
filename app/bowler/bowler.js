  'use strict';

  angular.module('myApp.bowler', ['ngRoute'])

  .config(['$routeProvider', function($routeProvider, $routeParams) {
    $routeProvider.when('/bowlers/:bowlerId', {
      templateUrl: 'bowler/bowler.html',
      controller: 'BowlerCtrl'
    });
  }])

  .controller('BowlerCtrl', ['$scope', '$routeParams', '$http', '$location', function($scope, $routeParams, $http, $location) {
    if (Object.keys(authdata).length>0) {
      $http.defaults.headers.common['Authorization'] = 'Basic ' + authdata;

      $scope.bowlerId = $routeParams.bowlerId;

      $http.get(baseUrl + "/bowlers/" + $scope.bowlerId).success(function(response) {
        // console.log(response);
        $scope.bowler_id = response.id;
        $scope.bowler_name = response.name;
        $http.get(baseUrl + "/leagues").success(function(response) {
          console.log('leagues');
          console.log(response);
          var leagues = response;
          for (var i in leagues) {
            console.log(i,leagues[i].id)
            $http.get(baseUrl + "/leagues/" + leagues[i].id + "/lotteries").success(function(response) {
              // console.log(response);
              var lotteries = response;
              for (var j in lotteries) {
                if (lotteries[j]) {
                  console.log(leagues[i].id,lotteries[j].id);
                }
                // console.log(key,lotteries[key]);
                // $http.get(baseUrl + "/leagues/" + leagues[i].id + "/lotteries/" + lotteries[j].id + "/tickets")
                //   .success(function(response) {
                //     console.log(response.bowler_id);
                //   });

                }
              });
            }
          });
        });
    } else {
      $location.path('/login');
    }

  }]);
