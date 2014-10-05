angular.module('mean.entrenamientos').factory('Entrenamientos', function ($http, $q) {
    return {
        get: function (busquedaId,interpreteId,page) {
            var defer = $q.defer();
            $http({method: 'GET', url: '/entrenamiento/'+busquedaId+'/'+interpreteId+'/'+page}).
                success(function (data, status, headers, config) {
                    defer.resolve(data);
                })
                .error(function (data, status, headers, config) {
                    defer.reject(status);
                });
            return defer.promise;
        },
        busquedasArchivadas: function (busquedaId,interpreteId,page) {
            var defer = $q.defer();
            $http({method: 'GET', url: '/entrenamiento/archivadas'}).
                success(function (data, status, headers, config) {
                    defer.resolve(data);
                })
                .error(function (data, status, headers, config) {
                    defer.reject(status);
                });
            return defer.promise;
        },
        califica: function (id,valor,interpreteId) {
            var defer = $q.defer();
            $http({method: 'GET', url: '/entrenamiento/califica/'+id+'/'+valor+'/'+interpreteId}).
                success(function (data, status, headers, config) {
                    defer.resolve(data);
                }).error(function (data, status, headers, config) {
                    defer.reject(status);
                });
            return defer.promise;
        }
    }
});