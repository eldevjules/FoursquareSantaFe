// When the window has finished loading create our google map below
google.maps.event.addDomListener(window, 'load', init);
Mustache.tags = ['{[{', '}]}'];

var map, pointarray, heatmap, gradient, trendings, markersTrending;
// var centroSantaFe = new google.maps.LatLng(40.7504877,-73.9839238); 
// var centroSantaFe = new google.maps.LatLng(51.5065757,-0.0907085);
var fullWidth = $( window ).width() -300;
var centroSantaFe = new google.maps.LatLng(19.3661714,-99.2655203);

var zoomInicial = 15;
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
       'rgba(54, 196, 232, 1)',
       'rgba(54, 152, 232, 1)',
       'rgba(54, 107, 232, 1)',
       'rgba(54, 62, 232, 1)',
       'rgba(90, 54, 232, 1)',
       'rgba(83, 52, 209, 1)',
       'rgba(76, 48, 184, 1)',
       'rgba(69, 46, 159, 1)',
       'rgba(64, 54, 135, 1)',
       'rgba(101, 43, 108, 1)',
       'rgba(135, 45, 71, 1)',
       'rgba(184, 54, 48, 1)',
       'rgba(232, 90, 54, 1)'
    ]

    //Poniendo marcadores default
    
    //Kamikaze
    var markerImagekamikaze = new google.maps.MarkerImage('/img/pines/kamikaze2.png', new google.maps.Size(60, 60));
    var kamikazelab = new google.maps.LatLng(19.359783,-99.278924);
    //Objeto del marcador
    var marker = new google.maps.Marker({
        position: kamikazelab,
        draggable: false,
        icon: markerImagekamikaze,
        map: map,
    });
    //Ibero
    var markerImageibero = new google.maps.MarkerImage('/img/pines/ibero2.png', new google.maps.Size(60, 60));
    var ibero = new google.maps.LatLng(19.3702546,-99.2645616);
    //Objeto del marcador
    var marker = new google.maps.Marker({
        position: ibero,
        draggable: false,
        icon: markerImageibero,
        map: map,
    });
    //Televisa
    var markerImagetelevisa = new google.maps.MarkerImage('/img/pines/televisa2.png', new google.maps.Size(60, 60));
    var televisa = new google.maps.LatLng(19.3755553,-99.2569681);
    //Objeto del marcador
    var marker = new google.maps.Marker({
        position: televisa,
        draggable: false,
        icon: markerImagetelevisa,
        map: map,
    });
    //Banamex
    var markerImagebanamex = new google.maps.MarkerImage('/img/pines/banamex2.png', new google.maps.Size(60, 60));
    var banamex = new google.maps.LatLng(19.3753326,-99.2592855);
    //Objeto del marcador
    var marker = new google.maps.Marker({
        position: banamex,
        draggable: false,
        icon: markerImagebanamex,
        map: map,
    });
    //Tec
    var markerImagetec = new google.maps.MarkerImage('/img/pines/tec2.png', new google.maps.Size(60, 60));
    var tec = new google.maps.LatLng(19.3596064,-99.2613108);
    //Objeto del marcador
    var marker = new google.maps.Marker({
        position: tec,
        draggable: false,
        icon: markerImagetec,
        map: map,
    });
    //Chrysler
    var markerImagechrysler = new google.maps.MarkerImage('/img/pines/chrysler2.png', new google.maps.Size(60, 60));
    var chrysler = new google.maps.LatLng(19.3568705,-99.2746439);
    //Objeto del marcador
    var marker = new google.maps.Marker({
        position: chrysler,
        draggable: false,
        icon: markerImagechrysler,
        map: map,
    });



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
    $.get("/kamikazes/", function( data ){
      var template = $('#templateSingleUser').html();
      var rendered = Mustache.render(template, {tops: data.kamikazes});
      $('#top-cheks').html(rendered);
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

        heatmap.set('radius', heatmap.get('radius') ? null : 20);
        
        heatmap.set('opacity', heatmap.get('opacity') ? null : 0.8);

        heatmap.setMap(map);


        //Trendings

            //Limpiando trendings anteriores
            trendings = [];
            markersTrending = [];

            //Recorremos los lugares trending
            $.each(data.topPlaces, function( index, element ) {
                
                var place = element.venue;
                place['item'] = index+1;
                place['categoriaIcono'] = place.categories[0].icon.prefix+'64.png'
                trendings.push(place);

                console.log(place.categories[0].name);

                //Selección de imagen
                var imageUrl = '';  
                if(place.categories[0].name == "Salad Place"){
                    imageUrl = '/img/pines/ensalada2.png';
                    place['clase'] = "color-13";
                }
                if(place.categories[0].name == "Gym / Fitness Center" ||
                    place.categories[0].name == "Gym"){
                    imageUrl = '/img/pines/gym2.png';
                    place['clase'] = "color-8";
                }
                if(place.categories[0].name == "Bar" || place.categories[0].name == "Hookah Bar"){
                    imageUrl = '/img/pines/bar2.png';
                    place['clase'] = "color-7";
                }
                if(place.categories[0].name == "Café" ||
                    place.categories[0].name == "Diner" ||
                    place.categories[0].name == "Coffee Shop"){
                    imageUrl = '/img/pines/cafe2.png';
                    place['clase'] = "color-1";
                }
                if(place.categories[0].name == "Food" || 
                    place.categories[0].name == "American Restaurant" || 
                    place.categories[0].name == "Restaurant" ||
                    place.categories[0].name == "Burger Joint" ||
                    place.categories[0].name == "Brewery Bar Restaurant" ||
                    place.categories[0].name == "Seafood Restaurant"
                    ){
                    imageUrl = '/img/pines/comida2.png';
                    place['clase'] = "color-10";
                }
                if(place.categories[0].name == "Arts & Entertainment" || 
                    place.categories[0].name == "Indie Movie Theater" ||
                    place.categories[0].name == "Multiplex"){
                    imageUrl = '/img/pines/entretenimiento2.png';
                    place['clase'] = "color-12";
                }
                if(place.categories[0].name == "Hotel"){
                    imageUrl = '/img/pines/hotel2.png';
                    place['clase'] = "color-9";
                }
                if(place.categories[0].name == "Nightlife Spot" ||
                    place.categories[0].name == "Nightclub" ||
                    place.categories[0].name == "Brewery"){
                    imageUrl = '/img/pines/noche2.png';
                    place['clase'] = "color-2";
                }
                if(place.categories[0].name == "Tea Room"){
                    imageUrl = '/img/pines/te2.png';
                    place['clase'] = "color-6";
                }
                if(place.categories[0].name == "Shop & Service" || place.categories[0].name == "Mall"){
                    imageUrl = '/img/pines/tienda2.png';
                    place['clase'] = "color-11";
                }
                if(place.categories[0].name == "College & University" ||
                    place.categories[0].name == "University"){
                    imageUrl = '/img/pines/universidad2.png';
                    place['clase'] = "color-4";
                }
                if(place.categories[0].name == "Professional & Other Places" ||
                    place.categories[0].name == "Convention Center" ||
                    place.categories[0].name == "Tech Startup"){
                    imageUrl = '/img/pines/trabajo2.png';
                    place['clase'] = "color-3";
                }
                if(imageUrl == ''){
                    imageUrl = '/img/pines/general2.png';
                    place['clase'] = "color-5";
                }

                //Creando el markerImage
                var markerImage = new google.maps.MarkerImage(imageUrl, new google.maps.Size(35, 60));
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

            console.log(trendings);

            //Una vez que los markes trendings estan puestos hay que navegar sobre ellos
            var bounds = map.getBounds(),
            ne = bounds.getNorthEast(),
            sw = bounds.getSouthWest();
            diff_height = ne.lat() - sw.lat();

            var template = $('#templateSinglePlace').html();
            var rendered = Mustache.render(template, {places: trendings});
            $('#top5Places').html(rendered);
            navegaSobreTrending(0);



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

      //Elegimos un tip aleatorio
      var lostips = trendN.tips.groups[0].items;
      var nrandom = Math.floor((Math.random() * lostips.length) + 1);
      var eltip = lostips[nrandom];
      if(eltip){
        var textTip = eltip.text;
      }else{ 
        var textTip = '...';
      }
      trendN['tip'] = textTip;

      //Elegimos fotos aleatorias
      trendN['sampleFotos'] = _.sample(trendN.fotos, 10);

      console.log(trendN);
      //Mostramos la info del lugar
      var template = $('#templateFlashPlace').html();
      var rendered = Mustache.render(template, {place: trendN});
      $('#showPlace').html(rendered);
      $(".placeContainer").css("width", fullWidth);
      $(".placeContainer").animate({bottom:'10px'}, 1000);
      setTimeout(function(){
            $(".placeContainer").animate({bottom:'-550px'}, 1000);
        }, 13000);

      //Anima este marker
      markerN = markersTrending[n];
      markerN.setAnimation(google.maps.Animation.BOUNCE);

      if(newN == 1){
        //map.setZoom(zoomInPlace);
      }

      navegaSobreTrending(newN);

    }else{

        var template = $('#templateSinglePlace').html();
        var rendered = Mustache.render(template, {places: trendings});
        $('#showPlace').html('');

      //Cuando ya termino, se centra en santa fe
      map.panTo(centroSantaFe);

      //Quitamos animacion del ultimo pin
      nAnterior = trendings.length-1;
      markerN = markersTrending[nAnterior];
      markerN.setAnimation(null);

      //map.setZoom(zoomInicial);
      navegaSobreTrending(0);
    }
  },15000);
}


