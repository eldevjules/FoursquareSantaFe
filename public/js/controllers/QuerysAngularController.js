'use strict';

angular.module('mean.querys').controller('QuerysController', ['$scope', '$routeParams', '$location', 'Global', 'Querys', function ($scope, $routeParams, $location, Global, Querys) {
    
    $scope.global = Global;
    $scope.q = {
        'haslinks': 'Da igual',
        'hashashtags': 'Da igual',
        'hasmedia': 'Da igual',
        'hasmentions': 'Da igual',
        'isretweet': 'Da igual',
        'isverified': 'Da igual',
        'hasgeo': 'Da igual',
        'haslang': 'Da igual',
        'lang': 'es',
        'usestatuscount': 'No',
        'usefriendscount': 'No',
        'usefollowerscount': 'No',
        'usesources': 'No',
        'operatorsources': 'incluye',
        'phrasesoperator': 'aleatorias'
    }

    $scope.formquery = {
        'hayerror': false,
        'error': '',
        'loading': false
    }
    //point_radius:[lon lat radius]
    $scope.create = function(q) {
        var query = new Querys(q);
        
        $scope.formquery.loading = true;
        query.$save(function(response) {
            
            $scope.formquery.loading = false;
            if(response.status == 'OK'){
                q = {};
                $location.path('querys/' + response.query._id);
            }else{
                $scope.formquery.hayerror = true;
                $scope.formquery.error = response.error;
            }

        });
        
        
    };

    $scope.remove = function(query) {
        query.$remove();
        $location.path('querys');
    };

    $scope.update = function(q) {
        var query = q;

        $scope.formquery.loading = true;
        query.$update(function(response) {
            
            $scope.formquery.loading = false;
            if(response.status == 'OK'){
                q = {};
                $location.path('querys/' + response.query._id);
            }else{
                $scope.formquery.hayerror = true;
                $scope.formquery.error = response.error;
            }
        });
        
    };

    $scope.find = function() {
        Querys.query(function(querys) {
            $scope.querys = querys;
        });
    };

    $scope.findOne = function() {
        Querys.get({
            queryId: $routeParams.queryId
        }, function(query) {
            $scope.q = query;
        });
    };
}]);