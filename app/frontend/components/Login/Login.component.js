/*global angular*/
angular.module('app')
    .component('litLogin', {
        templateUrl: 'components/Login/Login.html',
        controller: ['$scope', '$location', 'Auth', 'API', 'Error', function ($scope, $location, Auth, API, Error) {
            $scope.user = {};

            $scope.error = Error.error;
            $scope.$on('Error', function (event, args) {
                $scope.error = args.error;
            });

            $scope.login = function () {
                Auth.auth($scope.user).then(function () {
                    $location.path('/');
                }, Error.handle);
            }
        }]
    });