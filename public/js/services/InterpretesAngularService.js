'use strict';

//Interpretes service used for Interpretes REST endpoint
angular.module('mean.interpretes').factory('Interpretes', ['$resource', function($resource) {
    return $resource('/interpretes/:interpreteId', {
        interpreteId: '@_id'
    }, {
        update: {
            method: 'PUT'
        }
    });
}]);

angular.module('mean.interpretes').factory('Interprete', function ($http, $q) {
    return {
        total: function (interpreteId) {
            var defer = $q.defer();
            $http({method: 'GET', url: '/interpretes/total/'+interpreteId}).
                success(function (data, status, headers, config) {
                    defer.resolve(data);
                })
                .error(function (data, status, headers, config) {
                    defer.reject(status);
                });
            return defer.promise;
        },
        conecta: function (interprete) {
            var defer = $q.defer();
            $http({method: 'POST', url: '/interpretes/conecta/', data: interprete}).
                success(function (data, status, headers, config) {
                    defer.resolve(data);
                })
                .error(function (data, status, headers, config) {
                    defer.reject(status);
                });
            return defer.promise;
        },
        info: function (interprete) {
            var defer = $q.defer();
            $http({method: 'POST', url: '/interpretes/info/', data: interprete}).
                success(function (data, status, headers, config) {
                    defer.resolve(data);
                })
                .error(function (data, status, headers, config) {
                    defer.reject(status);
                });
            return defer.promise;
        },
        conectados: function(){
            var defer = $q.defer();
            $http({method: 'POST', url: '/interpretes/conectados'}).
                success(function (data, status, headers, config) {
                    defer.resolve(data);
                })
                .error(function (data, status, headers, config) {
                    defer.reject(status);
                });
            return defer.promise;
        },
    }
});