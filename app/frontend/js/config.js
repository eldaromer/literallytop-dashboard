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
            .when('/storefront/:user_id', {
                name: 'Storefront',
                template: '<lit-storefront></lit-storefront>'
            })
            .when('/', {
                resolveRedirectTo: ['Auth', function(Auth) {
                    var payload = Auth.getTokenPayload();
                    if (payload) {
                        return '/storefront/' + payload.user._id;
                    } else {
                        return '/login';
                    }
                }]
            })
            .otherwise({redirectTo: "/login"});
    }]);