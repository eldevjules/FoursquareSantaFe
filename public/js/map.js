// When the window has finished loading create our google map below
google.maps.event.addDomListener(window, 'load', init);
Mustache.tags = ['{[{', '}]}'];

var map, pointarray, heatmap, gradient, trendings, markersTrending;
var centroSantaFe = new google.maps.LatLng(19.3661714,-99.2655203);
var zoomInicial = 16;
var zoomInPlace = 18;
var diff_height = 0;
var placeVisit = {};

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

    //Yendo por los kamikazes
    kamikazes();

    //Timer
    // setInterval(function(){
    //     explore();
    // }, 30000);
    
    // setTimeout(function(){
    //     map.panTo(new google.maps.LatLng('19.3568971','-99.2514414'));
    // },6000);

}


function kamikazes(){

    //Top de kamikazes
    $.get( "/kamikazes/", function( data ) {
        console.log(data);
    });

}

//Cada 30 segundos
function explore(){

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
                
                place['item'] = index+1;
                trendings.push(place);

                //Selección de imagen
                var imageUrl = '';  
                if(place.categories[0].name == "Salad Place"){
                    imageUrl = '/img/pines/ensalada.png';
                    place['clase'] = "color-1";
                }
                if(place.categories[0].name == "Gym / Fitness Center"){
                    imageUrl = '/img/pines/gym.png';
                    place['clase'] = "color-1";
                }
                if(place.categories[0].name == "Bar" || place.categories[0].name == "Hookah Bar"){
                    imageUrl = '/img/pines/bar.png';
                    place['clase'] = "color-1";
                }
                if(place.categories[0].name == "Café"){
                    imageUrl = '/img/pines/cafe.png';
                    place['clase'] = "color-1";
                }
                if(place.categories[0].name == "Food"){
                    imageUrl = '/img/pines/comida.png';
                    place['clase'] = "color-1";
                }
                if(place.categories[0].name == "Arts & Entertainment" || 
                    place.categories[0].name == "Indie Movie Theater" ||
                    place.categories[0].name == "Multiplex"){
                    imageUrl = '/img/pines/entretenimiento.png';
                    place['clase'] = "color-1";
                }
                if(place.categories[0].name == "Hotel"){
                    imageUrl = '/img/pines/hotel.png';
                    place['clase'] = "color-1";
                }
                if(place.categories[0].name == "Nightlife Spot"){
                    imageUrl = '/img/pines/noche.png';
                    place['clase'] = "color-1";
                }
                if(place.categories[0].name == "Tea Room"){
                    imageUrl = '/img/pines/te.png';
                    place['clase'] = "color-1";
                }
                if(place.categories[0].name == "Shop & Service" || place.categories[0].name == "Mall"){
                    imageUrl = '/img/pines/tienda.png';
                    place['clase'] = "color-1";
                }
                if(place.categories[0].name == "College & University"){
                    imageUrl = '/img/pines/universidad.png';
                    place['clase'] = "color-1";
                }
                if(place.categories[0].name == "Professional & Other Places"){
                    imageUrl = '/img/pines/trabajo.png';
                    place['clase'] = "color-1";
                }
                if(imageUrl == ''){
                    imageUrl = '/img/pines/general.png';
                    place['clase'] = "color-1";
                }

                //imageUrl = '/img/pines/general.png';

                //Creando el markerImage
                var markerImage = new google.maps.MarkerImage(imageUrl, new google.maps.Size(47, 80));
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
            var bounds = map.getBounds(),
            ne = bounds.getNorthEast(),
            sw = bounds.getSouthWest();
            diff_height = ne.lat() - sw.lat();


            console.log(trendings);

            var template = $('#templateSinglePlace').html();
            var rendered = Mustache.render(template, {places: trendings});
            console.log(rendered);
            $('#top5Places').html(rendered);
            navegaSobreTrending(0);

        });


    });

}


function navegaSobreTrending(n){
  setTimeout(function(){
    trendN = trendings[n];

    var newN = n + 1;
    if(newN <= trendings.length){

      if(n == 0){
        nAnterior = trendings.length-1;
      }else{
        nAnterior = n-1;
      }

      //Quita animate del marker anterior
      markerN = markersTrending[nAnterior];
      markerN.setAnimation(null);

      //Desplaza el mapa
      map.panTo(new google.maps.LatLng(trendN.location.lat - diff_height / 4 ,trendN.location.lng));

      //Mostramos la info del lugar
      showPlace(trendN);

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

function showPlace(place){
    console.log(place);
}

