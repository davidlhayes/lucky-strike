'use strict';

angular.module('myApp.bowlers', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/bowlers', {
    templateUrl: 'bowlers/bowlers.html',
    controller: 'BowlersCtrl'
  });
}])

.controller('BowlersCtrl', ['$scope', '$http', function($scope, $http) {

    var myId = 191;

    $scope.bowlers = [
      { id: 1, user_id: myId, name: 'Brian May', winnings: 45.},
      { id: 2, user_id: myId, name: 'Freddie Mercury', winnings: 45},
      { id: 3, user_id: myId, name: 'John Deacon', winnings: 123.41},
      { id: 4, user_id: myId, name: 'Roger Taylor', winnings: 10},
      { id: 5, user_id: myId, name: 'Pete Best', winnings: 0}
    ];

}]);
