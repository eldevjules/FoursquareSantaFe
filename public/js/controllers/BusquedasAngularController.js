'use strict';

//COntrolador de listado de busquedas
angular.module('mean.busquedas').controller('BusquedasListController', ['$scope', '$routeParams', '$location', 'Global', 'Querys', 'Busquedas', 'Pusher', 
    function ($scope, $routeParams, $location, Global, Querys, Busquedas, Pusher) {
    
    $scope.global = Global;
    $scope.estados = '';
    
    $scope.find = function() {
        Busquedas.query(function(busquedas) {
            $scope.busquedas = busquedas;
        });
    };

    /* SOCKETS */
    Pusher.subscribe('pulse_busqueda', 'ChangeStatus', function (dataBySocket) {
        if($scope.busquedas){
            angular.forEach($scope.busquedas, function(busqueda) {
                if(busqueda._id == dataBySocket._id){
                    busqueda.estado = dataBySocket.estado;
                }
            });
        }
    });


}]);

//Controlador de detalle de busqueda
angular.module('mean.busquedas').controller('BusquedasController', ['$scope', '$routeParams', '$timeout', '$http', '$location', 'Global', 'Querys', 'Interprete', 'Busquedas', 'Registros', 'Usuarios', 'Medias', 'URLs', 'Hashtags', 'Menciones', 'Locaciones', 'Generadores', 'Geos', 'Pusher', 
    function ($scope, $routeParams, $timeout, $http, $location, Global, Querys, Interprete, Busquedas, Registros, Usuarios, Medias, URLs, Hashtags, Menciones, Locaciones, Generadores, Geos, Pusher) {
    
    $scope.global = Global;
    $scope.timer = '';
    $scope.registros = { //Listados de Registros
        results: [],
        current: 1,
        total: 0,
        loading: false
    }
    $scope.usuarios = { //Listados de Usuarios
        results: [],
        current: 1,
        total: 0,
        todos: 0,
        loading: false
    }
    $scope.medias = { //Listados de Medias
        results: [],
        current: 1,
        total: 0,
        todos: 0,
        loading: false
    }
    $scope.urls = { //Listados de URLs
        results: [],
        current: 1,
        total: 0,
        todos: 0,
        loading: false
    }
    $scope.hashtags = { //Listados de Hashtags
        results: [],
        current: 1,
        total: 0,
        todos: 0,
        loading: false
    }
    $scope.menciones = { //Listados de Menciones
        results: [],
        current: 1,
        total: 0,
        todos: 0,
        loading: false
    }
    $scope.locaciones = { //Listados de Locaciones
        results: [],
        current: 1,
        total: 0,
        todos: 0,
        loading: false
    }
    $scope.generadores = { //Listados de generadores
        results: [],
        current: 1,
        total: 0,
        todos: 0,
        loading: false
    }
    $scope.geos = { //Listados de geos
        results: [],
        current: 1,
        total: 0,
        todos: 0,
        loading: false
    }

    /* Valores para el formulario */
    /******************************************************/
    /******************************************************/

    //Interpretes
    Interprete.conectados().then(function (interpretes) {
        $scope.interpretes = interpretes;
    });

    $scope.isAvanced = true;
    $scope.fuente = "Twitter";
    $scope.trabajo = "OnDemand";
    $scope.canal = "Default";
    $scope.estado = "Pendiente";
    $scope.tweets = [];

    //Times
    $scope.hstep = 1;
    $scope.mstep = 1;
    //Dates
    $scope.inicio = new Date();
    $scope.termino = new Date();

    $scope.clear = function () {
        $scope.inicio = null;
        $scope.termino = null;
    };
    $scope.open = function($event,number) {
        $event.preventDefault();
        $event.stopPropagation();
        if(number == 1){
            $scope.opened1 = true;
        }else{
            $scope.opened2 = true;
        }
    };
    /******************************************************/
    /******************************************************/
    
    

    
    $scope.create = function() {
        
        //Querys que están seleccionados
        $scope.querysSelected = [];
        angular.forEach(this.querys, function(query) {
          if (query.select) $scope.querysSelected.push(query._id);
        });

        //Interpretes que están seleccionados
        $scope.interpretesSelected = [];
        angular.forEach(this.interpretes, function(interprete) {
          if (interprete.select) $scope.interpretesSelected.push(interprete._id);
        });

        $scope.inicio.setSeconds(0,0);
        $scope.termino.setSeconds(0,0);
        var busqueda = new Busquedas({
            identificador: this.identificador,
            tags: this.tags,
            fuente: this.fuente,
            inicio: this.inicio,
            termino: this.termino,
            querys: this.querysSelected,
            interpretes: this.interpretesSelected,
            trabajo: this.trabajo,
            canal: this.canal
        });
        busqueda.$save(function(response) {
            $location.path('busquedas/' + response._id);
        });

    };

    $scope.remove = function(busqueda) {
        if (busqueda) {
            busqueda.$remove();

            for (var i in $scope.busquedas) {
                if ($scope.busquedas[i] === busqueda) {
                    $scope.busquedas.splice(i, 1);
                }
            }
        }
        else {
            $scope.busqueda.$remove();
            $location.path('busquedas');
        }
    };

    $scope.archive = function(busqueda){
        
        $http({method: 'POST', url: '/busquedas/archive', data: $scope.busqueda }).
        success(function(data, status, headers, config) {
          // this callback will be called asynchronously
          // when the response is available
          $location.path('/busquedas');
        }).
        error(function(data, status, headers, config) {
          $location.path('/');
        });
    }

    $scope.update = function() {

        //Querys que estan seleccionados
        $scope.querysSelected = [];
        angular.forEach(this.querys, function(query) {
          if (query.select) $scope.querysSelected.push(query._id);
        });

        //Interpretes que estan seleccionados
        $scope.interpretesSelected = [];
        angular.forEach(this.interpretes, function(interprete) {
          if (interprete.select) $scope.interpretesSelected.push(interprete._id);
        });

        var busqueda = $scope.busqueda;
        busqueda.querys = $scope.querysSelected;
        busqueda.interpretes = $scope.interpretesSelected;

        if (!busqueda.updated) {
            busqueda.updated = [];
        }
        busqueda.updated.push(new Date().getTime());

        busqueda.$update(function() {
            $location.path('busquedas/' + busqueda._id);
        });
    };

    $scope.findQuerys = function(){
        //Querys
        Querys.query(function(querys) {
            $scope.querys = querys;
        });
    }
    $scope.findOne = function() {
        Querys.query(function(querys) {
            $scope.querys = querys;
        
            Busquedas.get({
                busquedaId: $routeParams.busquedaId
            }, function(busqueda) {
                
                //Guardamos la busqueda en el scope
                $scope.busqueda = busqueda;

                //Obtenemos los registros obtenidos por la busqueda
                $scope.cargaRegistros();
                // Obtenemos los usuarios obtenidos por la busqueda
                $scope.cargaUsuarios();
                // Obtenemos las imagenes obtenidas por la busqueda
                $scope.cargaMedias();
                // Obtenemos las urls obtenidas por la busqueda
                $scope.cargaUrls();
                // Obtenemos los hashtags obtenidas por la busqueda
                $scope.cargaHashtags();
                // Obtenemos las menciones obtenidas por la busqueda
                $scope.cargaMenciones();
                // Obtenemos las locaciones obtenidas por la busqueda
                $scope.cargaLocaciones();
                // Obtenemos los generadores obtenidos por la busqueda
                $scope.cargaGeneradores();
      
                //Recorremos los querys de la busqueda para rellenar los que habia elegido previamente
                angular.forEach($scope.busqueda.querys, function(queryEnBusqueda) {
                    angular.forEach($scope.querys, function(query) {
                        if(query._id == queryEnBusqueda._id) query.select = true;
                    });
                });

                //Recorremos los interpretes de la busqueda para rellenar los que habia elegido previamente
                angular.forEach($scope.busqueda.interpretes, function(interpreteEnBusqueda) {
                    angular.forEach($scope.interpretes, function(interprete) {
                        if(interprete._id == interpreteEnBusqueda._id) interprete.select = true;
                    });
                });


                //Si la busqueda fue creada para manejarse realtime hay que suscribirnos al canal que enviara los datos
                if($scope.busqueda.trabajo == "RealTime"){
                    if($scope.busqueda.canal == "Default"){
                        var canal = $scope.busqueda._id;
                    }else{
                        var canal = $scope.busqueda.canal;
                    }

                    //Sockets 
                    Pusher.subscribe(canal, 'NewTweets', function (data) {

                        //angular.forEach(tweets, function(data) {

                            //Registros
                            $scope.registros.total++;
                            if($scope.registros.results.length == 10){
                                $scope.registros.results.pop();
                            }
                            $scope.registros.results.unshift(data.registro);
                            
                            //Usuarios
                            $scope.usuarios.todos++;
                            if(data.usuario){
                                $scope.usuarios.total++;
                            }
                            if(($scope.usuarios.todos % 20) == 0){
                                $scope.cargaUsuarios();
                            }

                            //Generadores
                            $scope.generadores.todos++;
                            if(data.generador){
                                $scope.generadores.total++;
                            }
                            if(($scope.generadores.todos % 20) == 0){
                                $scope.cargaGeneradores();
                            }

                            //Locacion
                            $scope.locaciones.todos++;
                            if(data.locacion){
                                $scope.locaciones.total++;
                            }
                            if(($scope.locaciones.todos % 20) == 0){
                                $scope.cargaLocaciones();
                            }

                            //Geos
                            if(data.geo){
                                $scope.geos.total++;
                                $scope.geos.results.unshift(data.geo);
                            }

                            //Hashtags
                            angular.forEach(data.hashtags, function(hashtag) {
                                
                                $scope.hashtags.todos++;
                                if(hashtag.nuevo){
                                    $scope.hashtags.total++;
                                }
                                if(($scope.hashtags.todos % 20) == 0){
                                    $scope.cargaHashtags();
                                }
                                
                            });

                            //Medias
                            angular.forEach(data.medias, function(media) {
                                
                                $scope.medias.todos++;
                                if(media.nuevo){
                                    $scope.medias.total++;
                                }
                                if(($scope.medias.todos % 20) == 0){
                                    $scope.cargaMedias();
                                }
                                
                            });

                            //Urls
                            angular.forEach(data.urls, function(url) {
                                
                                $scope.urls.todos++;
                                if(url.nuevo){
                                    $scope.urls.total++;
                                }
                                if(($scope.urls.todos % 20) == 0){
                                    $scope.cargaUrls();
                                }
                                
                            });

                            //Menciones
                            angular.forEach(data.menciones, function(mencion) {
                                
                                $scope.menciones.todos++;
                                if(mencion.nuevo){
                                    $scope.menciones.total++;
                                }
                                if(($scope.menciones.todos % 20) == 0){
                                    $scope.cargaMenciones();
                                }
                                
                            });

                        //}); //Tweets

                    }); //Pusher


                }

                /********************************************************************************/
                /********************************************************************************/

            });

        });
    };


    /* Paginadores */
    /********************************************************************************/
    /********************************************************************************/

    // Carga de registros
    $scope.cambioPaginaRegistros = function(page){
        $scope.registros.current = page;
        $scope.cargaRegistros();
    }
    $scope.cargaRegistros = function() {
        //Obtenemos mas registros obtenidos por la busqueda
        if($routeParams.busquedaId){
            $scope.registros.loading = true;
            Registros.get($routeParams.busquedaId, $scope.registros.current).then(function (data) {
                $scope.registros.results = data.results;
                $scope.registros.total = data.count;
                $scope.registros.loading = false;
            });
        }
    };

    // Carga de usuarios
    $scope.cambioPaginaUsuarios = function(page){
        $scope.usuarios.current = page;
        $scope.cargaUsuarios();
    }
    $scope.cargaUsuarios = function() {
        
        //Obtenemos mas usuarios obtenidos por la busqueda
        if($routeParams.busquedaId){
            $scope.usuarios.loading = true;
            Usuarios.get($routeParams.busquedaId, $scope.usuarios.current).then(function (data) {
                $scope.usuarios.results = data.results;
                $scope.usuarios.total = data.count;
                $scope.usuarios.loading = false;
            });
        }
    };

    // Carga de medias
    $scope.cambioPaginaMedias = function(page){
        $scope.medias.current = page;
        $scope.cargaMedias();
    }
    $scope.cargaMedias = function() {
        
        //Obtenemos mas medias obtenidos por la busqueda
        if($routeParams.busquedaId){
            $scope.medias.loading = true;
            Medias.get($routeParams.busquedaId, $scope.medias.current).then(function (data) {
                $scope.medias.results = data.results;
                $scope.medias.total = data.count;
                $scope.medias.loading = false;
            });
        }
    };

    // Carga de urls
    $scope.cambioPaginaUrls = function(page){
        $scope.urls.current = page;
        $scope.cargaUrls();
    }
    $scope.cargaUrls = function() {
        
        //Obtenemos mas urls obtenidos por la busqueda
        if($routeParams.busquedaId){
            $scope.urls.loading = true;
            URLs.get($routeParams.busquedaId, $scope.urls.current).then(function (data) {
                $scope.urls.results = data.results;
                $scope.urls.total = data.count;
                $scope.urls.loading = false;
            });
        }
    };

    // Carga de hashtags
    $scope.cambioPaginaHashtags = function(page){
        $scope.hashtags.current = page;
        $scope.cargaHashtags();
    }
    $scope.cargaHashtags = function() {
        
        //Obtenemos mas hashtags obtenidos por la busqueda
        if($routeParams.busquedaId){
            $scope.hashtags.loading = true;
            Hashtags.get($routeParams.busquedaId, $scope.hashtags.current).then(function (data) {
                $scope.hashtags.results = data.results;
                $scope.hashtags.total = data.count;
                $scope.hashtags.loading = false;
            });
        }
    };

    // Carga de menciones
    $scope.cambioPaginaMenciones = function(page){
        $scope.menciones.current = page;
        $scope.cargaMenciones();
    }
    $scope.cargaMenciones = function() {
        
        //Obtenemos mas menciones obtenidos por la busqueda
        if($routeParams.busquedaId){
            $scope.menciones.loading = true;
            Menciones.get($routeParams.busquedaId, $scope.menciones.current).then(function (data) {
                $scope.menciones.results = data.results;
                $scope.menciones.total = data.count;
                $scope.menciones.loading = false;
            });
        }
    };

    // Carga de locaciones
    $scope.cambioPaginaLocaciones = function(page){
        $scope.locaciones.current = page;
        $scope.cargaLocaciones();
    }
    $scope.cargaLocaciones = function() {
        
        //Obtenemos mas locaciones obtenidos por la busqueda
        if($routeParams.busquedaId){
            $scope.locaciones.loading = true;
            Locaciones.get($routeParams.busquedaId, $scope.locaciones.current).then(function (data) {
                $scope.locaciones.results = data.results;
                $scope.locaciones.total = data.count;
                $scope.locaciones.loading = false;
            });
        }
    };

    // Carga de generadores
    $scope.cambioPaginaGeneradores = function(page){
        $scope.generadores.current = page;
        $scope.cargaGeneradores();
    }
    $scope.cargaGeneradores = function() {
        
        //Obtenemos mas generadores obtenidos por la busqueda
        if($routeParams.busquedaId){
            $scope.generadores.loading = true;
            Generadores.get($routeParams.busquedaId, $scope.generadores.current).then(function (data) {
                $scope.generadores.results = data.results;
                $scope.generadores.total = data.count;
                $scope.generadores.loading = false;
            });
        }
    };

    
    
    /*** MAPA ***/
    $scope.mapOptions = {
        zoom: 2,
        center: new google.maps.LatLng(29.00655, -76.2971),
        mapTypeId: google.maps.MapTypeId.TERRAIN
    }
    var infoWindow = new google.maps.InfoWindow();

    $scope.createMap = function(){
        $scope.map = new google.maps.Map(document.getElementById('map'), $scope.mapOptions);
        $scope.cargaGeos();
    }
    $scope.createMarker = function (geo){
        var marker = new google.maps.Marker({
            map: $scope.map,
            position: new google.maps.LatLng(geo.lat, geo.lng),
            title: geo.usuario
        });
        marker.title = geo.usuario
        marker.content = geo.body;
        
        google.maps.event.addListener(marker, 'click', function(){
            infoWindow.setContent('<h5>' + marker.title + '</h5><div class="infoWindowContent">' + marker.content + '</div>');
            infoWindow.open($scope.map, marker);
        });

        $scope.markers.push(marker);
        
    }  

    $scope.openInfoWindow = function(e, selectedMarker){
        e.preventDefault();
        google.maps.event.trigger(selectedMarker, 'click');
    }    

    $scope.cambioPaginaGeos = function(page){
        $scope.geos.current = page;
        $scope.cargaGeos();
    }
    $scope.cargaGeos = function() {
        
        //Obtenemos mas geos obtenidos por la busqueda
        if($routeParams.busquedaId){
            $scope.geos.loading = true;
            Geos.get($routeParams.busquedaId, $scope.geos.current).then(function (data) {
                $scope.geos.results = data.results;
                $scope.geos.total = data.count;
                $scope.geos.loading = false;

                $scope.markers = [];
                for (var i = 0; i < $scope.geos.results.length; i++){
                    $scope.createMarker($scope.geos.results[i]);
                }

            });
        }
    };
    /********************************************************************************/
    /********************************************************************************/

    /* SOCKETS */
    /********************************************************************************/
    Pusher.subscribe('pulse_busqueda', 'ChangeStatus', function (dataBySocket) {
        if($scope.busqueda){
            $scope.busqueda.estado = dataBySocket.estado;
        }
    });

}]);