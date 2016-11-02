/*global angular*/
angular.module('app')
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider
            .when('/login', {
                name: 'Login',
                template: '<lit-login></lit-login>'
            })
            .when('/signup', {
                name: 'Signup',
                template: '<lit-signup></lit-signup>'
            })
            .when('/storefront', {
                name: 'Storefront',
                template: '<lit-storefront></lit-storefront>'
            })
            .when('/', {
                resolveRedirectTo: ['Auth', function(Auth) {
                    var payload = Auth.getTokenPayload();
                    if (payload) {
                        return '/storefront';
                    } else {
                        return '/login';
                    }
                }]
            })
            .otherwise({redirectTo: "/login"});
    }]);