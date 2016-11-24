/*global angular*/
angular.module('app')
    .directive('litSignup', function() {
        return {
            templateUrl: 'components/Signup/Signup.html',
            controller: ['$scope', '$location', 'API', function($scope, $location, API) {
                $scope.user= {};
                $scope.signup = function () {
                    API.User.signup($scope.user, function(user) {
                        $location.path('/');
                    });
                };
            }]
        };
    });