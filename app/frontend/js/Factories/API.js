/*global angular*/
angular.module('app')
    .constant('API_BASE', '/api/')
    .factory('API', ['$q', '$resource', function ($q, $resource) {
        var API = {};

        API.User = $resource(API_BASE + 'users/:user_id', {
            user_id: '@_id'
        }, {
            signup: {
                method: 'POST',
                url: API_BASE + 'users/signup'
            }
        });

        return API;
    }]);