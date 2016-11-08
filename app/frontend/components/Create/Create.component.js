/*global angular*/
angular.module('app')
    .directive('litCreate', function () {
        return {
            templateUrl: 'components/Create/Create.html',
            controller: ['$scope', 'API', function ($scope, API) {
                $scope.post = {};
                $scope.create = function () {
                    API.post.create($scope.post, function (post) {
                        console.log(post);
                    })
                };
            }]
        };
    });