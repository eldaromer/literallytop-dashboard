/*global angular*/
angular.module('app')
    .factory('Token', ['$cookies', function ($cookies) {
        var Token = {};

        Token._tokenCookie = 'litDashboardToken';

        Token.setToken = function () {
            $cookies.put(Token._tokenCookie, token);
        };

        Token.removeToken = function () {
            return $cookies.remove(Token._tokenCookie);
        };

        return Token;
    }]);