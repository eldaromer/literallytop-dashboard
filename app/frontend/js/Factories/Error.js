/*global angular*/
angular.module('app')
    .factory('Error', ['$location', '$rootScope', 'API', function ($rootScope, $location, API) {
        var Error = {};

        Error.error = null;

        Error._broadcastErrorEvent = function () {
            $rootScope.$broadcast('Error', {
                error: Error.error
            })
        };

        Error._broadcastErrorEvent();

        Error.statusRedirects = {
            403: {
                path: '/login'
            },
            /*422: {
                handle: Error.toast
            },*/
            501: {
                path: '/501'
            },
            other: {
                path: '/error'
            }
        };

        Error.handle = function (e) {
            console.error(e);
            Error.error=e;

            if (!e) return;

            var status = e.status;
            var data = e.data||e;

            if (status && Error.statusRedirects[status]) {
                var a = Error.statusRedirects[status];
                if (a.handle) return a.handle(data);
                return $location.path(a.path);
            } else {
                $location.path(Error.statusRedirects.other.path);
            }

            Error._broadcastErrorEvent();
        };

        return Error;
    }]);