/*global angular*/
angular.module('app')
    .directive('litCreate', function () {
        return {
            templateUrl: 'components/Create/Create.html',
            controller: ['$scope', '$location', 'API', function ($scope, $location, API) {
                $scope.post = {};
                $scope.create = function () {
                    API.Post.create($scope.post, function (post) {
                        $location.path('/');
                        console.log(post);
                    })
                };
            }]
        };
    });