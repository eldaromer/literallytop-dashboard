/*global angular*/
angular.module('app')
    .directive('litSignup', function() {
        return {
            templateUrl: 'components/Signup/Signup.html',
            controller: ['$scope', 'API', function($scope, API) {
                $scope.user= {};
                $scope.signup = function () {
                    API.User.signup($scope.user, function(user) {
                        console.log(user);
                    });
                };
            }]
        };
    });