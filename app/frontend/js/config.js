/*global angular*/
angular.module('app')
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider
            .when('/login', {
                name: 'Login',
                template: '<lit-login></lit-login>'
            });
    }]);