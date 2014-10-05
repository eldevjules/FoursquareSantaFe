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

	var obtenidos = 0
	var total = 0;
	var places = [];

	var placesData = [];


	async.doWhilst(
	    function (callback) {
	        
	        foursquare.explore('19.3649138','-99.268232', '', { 'radius': 2000, 'limit':50, 'offset':obtenidos }, '', function(err, results){

	        	obtenidos = obtenidos+50;
	        	total = results.totalResults;

	        	// console.log("total: "+total);
	        	// console.log("obtenidos: "+obtenidos);

	        	_.forEach(results.groups[0].items, function(place) {
	        		places.push(place.venue);

	        		//Preguntamos cuanta gente hay aqui en este momento
	        		//console.log(place.venue.hereNow.count);
	        		for(var i=0; i<place.venue.hereNow.count; i++){
	        			placesData.push({ 'lat':place.venue.location.lat, 'lng':place.venue.location.lng });
	        		}

	        	});

	        	callback();

			});

	    },
	    function () { return obtenidos < total; },
	    function (err) {
	        
	        //var orderPlaces = _.sortBy(places, 'stats.checkinsCount');
	        
	        res.jsonp({'heatMap': placesData});
	    }
	);

}

exports.trending = function(req, res){

	var places = [];

	foursquare.explore('19.3649138','-99.268232', '', { 'radius': 1500, 'limit':5, }, '', function(err, results){

    	_.forEach(results.groups[0].items, function(place) {
    		places.push(place.venue);
    	});

    	res.jsonp({'places': places});

	});

}

