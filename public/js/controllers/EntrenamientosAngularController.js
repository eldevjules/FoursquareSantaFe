'use strict';

angular.module('mean.entrenamientos').controller('EntrenamientosController', ['$scope', '$routeParams', '$location', 'Global', 'Busquedas', 'Registros', 'Interpretes', 'Entrenamientos', function ($scope, $routeParams, $location, Global, Busquedas, Registros, Interpretes, Entrenamientos) {
    
    $scope.global = Global;
    $scope.registros = { //Listados de Registros
        results: [],
        current: 1,
        total: 0,
        loading: false
    }
    

    Interpretes.query(function(interpretes) {
        $scope.interpretes = interpretes;
    });
    Entrenamientos.busquedasArchivadas().then(function (busquedas) {
        $scope.busquedas = busquedas;
    });

    $scope.selectInterprete = function(interprete){
        $scope.currentInterprete = interprete;   
        
        if($scope.currentBusqueda){
            $scope.cargaRegistros();
        }
    }

    $scope.selectBusqueda = function(busqueda){
        $scope.currentBusqueda = busqueda;

        Busquedas.get({
            busquedaId: $scope.currentBusqueda._id
        }, function(busqueda) {
            $scope.cargaRegistros();
        });
    }

    $scope.cambioPaginaRegistros = function(page){
        $scope.registros.current = page;
        $scope.cargaRegistros();
    }
    $scope.cargaRegistros = function() {
        //Obtenemos mas registros obtenidos por la busqueda
        if($scope.currentBusqueda._id){
            $scope.registros.loading = true;
            Entrenamientos.get($scope.currentBusqueda._id, $scope.currentInterprete._id, $scope.registros.current).then(function (data) {
                $scope.registros.results = data.results;
                $scope.registros.total = data.count;
                $scope.registros.current = data.current;
                $scope.registros.loading = false;
            });
        }
    };


    $scope.califica = function(valor,registro){
        Entrenamientos.califica(registro._id,valor,$scope.currentInterprete._id).then(function (data) {
            for (var i in $scope.registros.results) {
                if ($scope.registros.results[i] === registro) {
                    //Quitamos el elemento del arreglo
                    $scope.registros.results.splice(i, 1);
                    //Lo descontamos del total
                    $scope.registros.total--;
                    //Si nos acabamos los registros, traemos más
                    if($scope.registros.results.length == 0){
                         $scope.cargaRegistros();
                    }
                }
            }
        });
    }


    
}]);