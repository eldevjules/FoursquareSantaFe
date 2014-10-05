'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
FQUser = mongoose.model('FQUser'),
	_ = require('lodash'),
	async = require('async');

	

//Config
var config = require('../../config/config');

//Redis Client
var redis = require("redis"),
	clientRedis = redis.createClient(config.redisStore.port,config.redisStore.url);
	clientRedis.auth(config.redisStore.auth);




var config = {
  'secrets' : {
    'clientId' : 'JCAJQQU5A50FVVNRXQSWRNFUOKKK4RO0YBYJVVAJGSP4KJ3P',
    'clientSecret' : 'HQ4ZZTHMJX0GMWOPSNZZEEC4BUYLGQHBKGE1A5U5XZIBJGTZ',
    'redirectUrl' : 'http://localhost:3000/callback/'
  }
}

var foursquare = require('node-foursquare')(config);
//var foursquareUsers = require('node-foursquare.Users')(config);



/**
 * Show an actor
 */
exports.init = function(req, res) {
	res.render('index');
};

exports.registro = function(req, res){
	res.writeHead(303, { 'location': foursquare.getAuthClientRedirectUrl() });
  	res.end();
}

exports.callback = function(req, res){
	

	foursquare.getAccessToken({
		code: req.query.code
	}, function (error, accessToken) {
		if(error) {
			res.send('An error was thrown: ' + error.message);
		}else {

			// Save the accessToken and redirect.
			foursquare.getUser('self', accessToken, function(err, results){
				
				FQUser.find({'userId': results.user.id}).exec(function(err, usuario) {
					
					if(usuario.length == 0){

						var fqUser = new FQUser({ 'token':accessToken, 'userId': results.user.id, 'data': results });
						fqUser.save(function(err, b) {
					        if (err) {
					            res.jsonp({"STATUS": "error"});
					        } else {
					        	res.render('mensage', {'response': 'Listo, gracias Kamikaze!'});
					        }
					    });

					}else{
						res.render('mensage', {'response': 'Agradecemos tu interés kamikaze, pero ya estás en la lista'});
					}
				});

			});
		
		}
	});

}

exports.explore = function(req, res){

	var obtenidos = 0,
	places = [],
	placesData = [],
  dicPlaces = {},
  intPlaces = [],
  topPlaces = [],
  topPlacesInfo = [],
	total = 0;



	async.doWhilst(
	    function (callback) {
	        
	        // foursquare.explore('19.408038','-99.172457', '', { 'radius': 2000, 'limit':50, 'offset':obtenidos }, '', function(err, results){
	        foursquare.explore('19.3649138','-99.268232', '', { 'radius': 3000, 'limit':50, 'offset':obtenidos }, '', function(err, results){

            //dicPlaces = {};
            //intPlaces = [];
            //topPlaces = [];

	        	obtenidos = obtenidos+50;
	        	total = results.totalResults;

	        	// console.log("total: "+total);
	        	// console.log("obtenidos: "+obtenidos);

	        	_.forEach(results.groups[0].items, function(place) {
	        		places.push(place.venue);

	        		//Preguntamos cuanta gente hay aqui en este momento
	        		//console.log(place.venue.hereNow.count);
              var totalVenue = place.venue.hereNow.count;
              if(typeof dicPlaces[totalVenue] === 'undefined'){
                dicPlaces[totalVenue] = [];
              }

              dicPlaces[totalVenue].push(place);

	        		for(var i=0; i<totalVenue; i++){
	        			placesData.push({ 'lat':place.venue.location.lat, 'lng':place.venue.location.lng });
	        		}

	        	});



	        	callback();

			});

	    },
	    function () { return obtenidos < total; },
	    function (err) {
	        
	        //var orderPlaces = _.sortBy(places, 'stats.checkinsCount');
            _.forEach(dicPlaces, function(val, i){
              intPlaces.push(+i);
            });

            function sortNumber(a,b) {
              return a - b;
            }
            intPlaces.sort(sortNumber);
            intPlaces.reverse();

            _.forEach(intPlaces, function(i){
              _.forEach(dicPlaces[''+i], function(val, key){
                topPlaces.push(val);  
              });
            }); 

            topPlaces = topPlaces.slice(0,5);
            var dictArray = {};
            _.forEach(topPlaces, function(val, i){
              dictArray[val.venue.id] = i;
            });

            async.each(topPlaces, function( venue, callback) {
              venue = venue.venue;
              foursquare.getVenue(venue.id, '', function(err, infoVenue){
                foursquare.getPhotos(venue.id, '',{ 'limit': 100 }, '', function(err, resultfotos){
                  infoVenue['venue']['fotos'] = resultfotos.photos.items;
                  //topPlacesInfo.push(infoVenue);
                  topPlacesInfo[dictArray[venue.id]] = infoVenue;
                  callback();
                });
              });

            }, function(err){


	        res.jsonp({'heatMap': placesData, 'places':places, 'topPlaces': topPlacesInfo});
		    
		});
	    }
	);

}

exports.trending = function(req, res){

	var places = [];

	// foursquare.getTrending('40.7504877','-73.9839238', { 'radius': 3000, 'limit':5, }, '', function(err, results){
	// foursquare.getTrending('51.5065757','-0.0907085', { 'radius': 3000, 'limit':5, }, '', function(err, results){
	foursquare.getTrending('19.3649138','-99.268232', { 'radius': 3000, 'limit':5, }, '', function(err, results){

    	async.each(results.venues, function( venue, callback) {

    		foursquare.getVenue(venue.id, '', function(err, infoVenue){

    			foursquare.getPhotos(venue.id, '',{ 'limit': 100 }, '', function(err, resultfotos){

					infoVenue['venue']['fotos'] = resultfotos.photos.items;
					places.push(infoVenue);
			    	callback();
		    	});
			});
		  
		}, function(err){
		    
		      res.jsonp({'places': places});
		    
		});

	});

}


exports.here = function(req, res){

	foursquare.getHereNow('4c462fb32dcd9c7448de0a7b', { }, '', function(err, results){

		//console.log(results);
    	res.jsonp({'checkins': results});

	});
}

exports.venue = function(req, res){

	foursquare.getVenue('4c462fb32dcd9c7448de0a7b', '', function(err, results){

		console.log(results);
    	res.jsonp({'checkins': results});

	});
}

exports.kamikazes = function(req, res){

	//
	FQUser.find({}, 'data.user.checkins data.user.badges.count data.user.mayorships.count data.user.photo data.user.gender data.user.firstName data.user.lastName').sort([['data.user.checkins.count', 'descending']]).exec(function(err, top){

		//console.log(top);
		res.jsonp({'kamikazes': top});

	});

}

