'use strict';

//Articles service used for articles REST endpoint
angular.module('mean.querys').factory('Querys', ['$resource', function($resource) {
    return $resource('/querys/:queryId', {
        queryId: '@_id'
    }, {
        update: {
            method: 'PUT'
        }
    });
}]);