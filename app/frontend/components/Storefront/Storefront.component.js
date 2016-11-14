/*global angular*/
angular.module('app')
    .directive('litStorefront', function () {
        return {
            templateUrl: 'components/Storefront/Storefront.html',
            controller: ['$scope', '$q', '$routeParams', 'Auth', 'API', '$location',
                function ($scope, $q, $routeParams, Auth, API, $location) {
                    console.log($routeParams);
                $scope.load = function () {
                    $q.all([
                        API.User.get($routeParams, function (a) {
                            $scope.user = a;
                        })
                    ])
                };

                $scope.load();

                $scope.logout = function () {
                    Auth.logout(function () {
                        console.log('logout');
                        $location.path('/');
                    })
                };
            }]
        }
    });