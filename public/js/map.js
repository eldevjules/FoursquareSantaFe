// When the window has finished loading create our google map below
google.maps.event.addDomListener(window, 'load', init);

var map, pointarray, heatmap, gradient, trendings, markersTrending;
var centroSantaFe = new google.maps.LatLng(19.3661714,-99.2655203);
var zoomInicial = 16;
var zoomInPlace = 18;

function init() {
    // Basic options for a simple Google Map
    // For more options see: https://developers.google.com/maps/documentation/javascript/reference#MapOptions
    var mapOptions = {
        // How zoomed in you want the map to start at (always required)
        zoom: zoomInicial,
        disableDefaultUI: true,

        // The latitude and longitude to center the map (always required)
        center: centroSantaFe, 

        // How you would like to style the map. 
        // This is where you would paste any style found on Snazzy Maps.
        styles: [
            {
                "stylers":[
                    {
                        "hue":"#ff1a00"
                    },
                    {
                        "invert_lightness":true
                    },
                    {
                        "saturation":-100
                    },
                    {
                        "lightness":33
                    },
                    {
                        "gamma":0.5
                    }
                ]
            },

            {
                "featureType":"road.highway",
                "elementType":"geometry.fill",
                "stylers":[
                    {
                        "color":"#333333"
                    }
                ]
            },

            {
                "featureType":"road.highway",
                "elementType":"geometry.stroke",
                "stylers":[
                    {
                        "color":"#000000"
                    },
                    {
                        "weight":0.2
                    }
                ]
            },

            {
                "featureType":"water",
                "elementType":"geometry",
                "stylers":[
                    {
                        "color":"#2D333C"
                    }
                ]
            }
        ]
    };

    // Get the HTML DOM element that will contain your map 
    // We are using a div with id="map" seen below in the <body>
    var mapElement = document.getElementById('map');

    // Create the Google Map using out element and options defined above
    map = new google.maps.Map(mapElement, mapOptions);
    gradient = [
        'rgba(0, 255, 255, 0)',
        'rgba(0, 255, 255, 1)',
        'rgba(0, 191, 255, 1)',
        'rgba(0, 127, 255, 1)',
        'rgba(0, 63, 255, 1)',
        'rgba(0, 0, 255, 1)',
        'rgba(0, 0, 223, 1)',
        'rgba(0, 0, 191, 1)',
        'rgba(0, 0, 159, 1)',
        'rgba(0, 0, 127, 1)',
        'rgba(63, 0, 91, 1)',
        'rgba(127, 0, 63, 1)',
        'rgba(191, 0, 31, 1)',
        'rgba(255, 0, 0, 1)'
    ]

    //Primer consulta
    explore();

    //Timer
    // setInterval(function(){
    //     explore();
    // }, 30000);
    
    // setTimeout(function(){
    //     map.panTo(new google.maps.LatLng('19.3568971','-99.2514414'));
    // },6000);

}

//Cada 30 segundos
function explore(){

    console.log("Yendo a explorer");

    //Mapa de Calor
    $.get( "/explore/", function( data ) {
      
        var checkInsData = [];
        $.each(data.heatMap, function( index, checkIn ) {
            checkInsData.push(new google.maps.LatLng(checkIn.lat, checkIn.lng));
        });
        var pointArray = new google.maps.MVCArray(checkInsData);

        heatmap = null;
        heatmap = new google.maps.visualization.HeatmapLayer({
            data: pointArray
        });
        heatmap.set('gradient', heatmap.get('gradient') ? null : gradient);

        heatmap.setMap(map);

        //Trendings
        $.get( "/trending/", function( response ) {
            console.log(response);

            //Limpiando trendings anteriores
            trendings = [];
            markersTrending = [];

            //Recorremos los lugares trending
            $.each(response.places, function( index, place ) {
                
                trendings.push(place);
                console.log(place);



                var imageUrl = '/img/ping.png';


                //Creando el markerImage
                var markerImage = new google.maps.MarkerImage(imageUrl, new google.maps.Size(24, 32));
                //Punto donde va
                var latLng = new google.maps.LatLng(place.location.lat, place.location.lng)
                //Objeto del marcador
                var marker = new google.maps.Marker({
                    position: latLng,
                    draggable: false,
                    icon: markerImage,
                    map: map,
                });
                //POnemos el marker en un arreglo apra poder limpiarlo despues
                markersTrending.push(marker);

            });

            //Una vez que los markes trendings estan puestos hay que navegar sobre ellos
            navegaSobreTrending(0);

        });


    });

}


function navegaSobreTrending(n){
    setTimeout(function(){
        
        trendN = trendings[n];

        var newN = n + 1;
        if(newN <= trendings.length){
            
            //Desplaza el mapa
            map.panTo(new google.maps.LatLng(trendN.location.lat,trendN.location.lng));
            
            if(n == 0){
                nAnterior = trendings.length-1;
            }else{
                nAnterior = n-1;
            }
            console.log("nAnterior: ");
            console.log(nAnterior);

            //Quita animate del marker anterior
            markerN = markersTrending[nAnterior];
            markerN.setAnimation(null);
            //Anima este marker
            markerN = markersTrending[n];
            markerN.setAnimation(google.maps.Animation.BOUNCE);

            if(newN == 1){
                //map.setZoom(zoomInPlace);
            }

            navegaSobreTrending(newN);

        }else{
            //Cuando ya termino, se centra en santa fe
            map.panTo(centroSantaFe);

            //Quitamos animacion del ultimo pin
            nAnterior = trendings.length-1;
            markerN = markersTrending[nAnterior];
            markerN.setAnimation(null);

            //map.setZoom(zoomInicial);
            navegaSobreTrending(0);
        }
    },5000);
}

