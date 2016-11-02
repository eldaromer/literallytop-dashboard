/*global angular*/
angular.module('app')
    .constant('API_BASE', '/api/')
    .factory('API', ['$q', '$resource', 'API_BASE', function ($q, $resource, API_BASE) {
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