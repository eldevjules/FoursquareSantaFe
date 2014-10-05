'use strict';

//Busquedas service used for articles REST endpoint
angular.module('mean.busquedas').factory('Busquedas', ['$resource', function($resource) {
    return $resource('/busquedas/:busquedaId', {
        busquedaId: '@_id'
    }, {
        update: {
            method: 'PUT'
        }
    });
}]);

angular.module('mean.busquedas').factory('Registros', function ($http, $q) {
    return {
        get: function (busquedaId,page) {
            var defer = $q.defer();
            $http({method: 'GET', url: '/registros/'+busquedaId+'/'+page}).
                success(function (data, status, headers, config) {
                    defer.resolve(data);
                })
                .error(function (data, status, headers, config) {
                    defer.reject(status);
                });
            return defer.promise;
        }        
    }
});

angular.module('mean.busquedas').factory('Interpretaciones', function ($http, $q) {
    return {
        get: function (busquedaId,page) {
            var defer = $q.defer();
            $http({method: 'GET', url: '/interpretaciones/'+busquedaId+'/'+page}).
                success(function (data, status, headers, config) {
                    defer.resolve(data);
                })
                .error(function (data, status, headers, config) {
                    defer.reject(status);
                });
            return defer.promise;
        }        
    }
});

angular.module('mean.busquedas').factory('Usuarios', function ($http, $q) {
    return {
        get: function (busquedaId,page) {
            var defer = $q.defer();
            $http({method: 'GET', url: '/usuarios/'+busquedaId+'/'+page}).
                success(function (data, status, headers, config) {
                    defer.resolve(data);
                })
                .error(function (data, status, headers, config) {
                    defer.reject(status);
                });
            return defer.promise;
        }        
    }
});

angular.module('mean.busquedas').factory('Medias', function ($http, $q) {
    return {
        get: function (busquedaId,page) {
            var defer = $q.defer();
            $http({method: 'GET', url: '/medias/'+busquedaId+'/'+page}).
                success(function (data, status, headers, config) {
                    defer.resolve(data);
                })
                .error(function (data, status, headers, config) {
                    defer.reject(status);
                });
            return defer.promise;
        }        
    }
});

angular.module('mean.busquedas').factory('URLs', function ($http, $q) {
    return {
        get: function (busquedaId,page) {
            var defer = $q.defer();
            $http({method: 'GET', url: '/urls/'+busquedaId+'/'+page}).
                success(function (data, status, headers, config) {
                    defer.resolve(data);
                })
                .error(function (data, status, headers, config) {
                    defer.reject(status);
                });
            return defer.promise;
        }        
    }
});

angular.module('mean.busquedas').factory('Hashtags', function ($http, $q) {
    return {
        get: function (busquedaId,page) {
            var defer = $q.defer();
            $http({method: 'GET', url: '/hashtags/'+busquedaId+'/'+page}).
                success(function (data, status, headers, config) {
                    defer.resolve(data);
                })
                .error(function (data, status, headers, config) {
                    defer.reject(status);
                });
            return defer.promise;
        }        
    }
});

angular.module('mean.busquedas').factory('Menciones', function ($http, $q) {
    return {
        get: function (busquedaId,page) {
            var defer = $q.defer();
            $http({method: 'GET', url: '/menciones/'+busquedaId+'/'+page}).
                success(function (data, status, headers, config) {
                    defer.resolve(data);
                })
                .error(function (data, status, headers, config) {
                    defer.reject(status);
                });
            return defer.promise;
        }        
    }
});

angular.module('mean.busquedas').factory('Locaciones', function ($http, $q) {
    return {
        get: function (busquedaId,page) {
            var defer = $q.defer();
            $http({method: 'GET', url: '/locaciones/'+busquedaId+'/'+page}).
                success(function (data, status, headers, config) {
                    defer.resolve(data);
                })
                .error(function (data, status, headers, config) {
                    defer.reject(status);
                });
            return defer.promise;
        }        
    }
});

angular.module('mean.busquedas').factory('Generadores', function ($http, $q) {
    return {
        get: function (busquedaId,page) {
            var defer = $q.defer();
            $http({method: 'GET', url: '/generadores/'+busquedaId+'/'+page}).
                success(function (data, status, headers, config) {
                    defer.resolve(data);
                })
                .error(function (data, status, headers, config) {
                    defer.reject(status);
                });
            return defer.promise;
        }        
    }
});

angular.module('mean.busquedas').factory('Geos', function ($http, $q) {
    return {
        get: function (busquedaId,page) {
            var defer = $q.defer();
            $http({method: 'GET', url: '/geos/'+busquedaId+'/'+page}).
                success(function (data, status, headers, config) {
                    defer.resolve(data);
                })
                .error(function (data, status, headers, config) {
                    defer.reject(status);
                });
            return defer.promise;
        }        
    }
});