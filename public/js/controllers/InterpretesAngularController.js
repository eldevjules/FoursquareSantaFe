'use strict';

angular.module('mean.interpretes').controller('InterpretesController', ['$scope', '$routeParams', '$location', 'Global', 'Interpretes', 'Interprete', function ($scope, $routeParams, $location, Global, Interpretes, Interprete) {
    
    $scope.global = Global;

    $scope.forminterprete = {
        'hayerror': false,
        'error': '',
        'loading': false
    }
    $scope.registros = {
        entrenados : 0
    }

    $scope.create = function(i) {
        var interprete = new Interpretes(i);
        
        $scope.forminterprete.loading = true;
        interprete.$save(function(response) {
            
            $scope.forminterprete.loading = false;
            if(response.status == 'OK'){
                i = {};
                $location.path('interpretes/' + response.interprete._id);
            }else{
                $scope.forminterprete.hayerror = true;
                $scope.forminterprete.error = response.error;
            }

        });
        
    };

    $scope.conectar = function(i){
        $scope.forminterprete.loading = true;

        Interprete.conecta(i).then(function (response) {
            $scope.forminterprete.loading = false;
            if(response.status == 'OK'){
                $scope.i = response.interprete;
                $scope.info();
            }else{
                $scope.forminterprete.hayerror = true;
                $scope.forminterprete.error = 'No se encontro el archivo asegurate de que la ruta es correcta';
            }
        });
    }

    $scope.info = function(){
        Interprete.info($scope.i).then(function (response) {
            if(response.status == 'OK'){
                $scope.result = response.result;
            }
        });   
    }

    $scope.remove = function(interprete) {
        interprete.$remove();
        $location.path('interpretes');
    };

    $scope.update = function(i) {
        var interprete = i;

        $scope.forminterprete.loading = true;
        interprete.$update(function(response) {
            
            $scope.forminterprete.loading = false;
            if(response.status == 'OK'){
                i = {};
                $location.path('interpretes/' + response.interprete._id);
            }else{
                $scope.forminterprete.hayerror = true;
                $scope.forminterprete.error = response.error;
            }
        });
        
    };

    $scope.find = function() {
        Interpretes.query(function(interpretes) {
            $scope.interpretes = interpretes;
        });
    };

    $scope.findOne = function() {
        Interpretes.get({
            interpreteId: $routeParams.interpreteId
        }, function(interprete) {
            $scope.i = interprete;

            Interprete.total($scope.i._id).then(function (data) {
                $scope.registros.entrenados = data.total;
            });
            $scope.info();

        });
    };
}]);