'use strict';

// require('nodetime').profile({
//     accountKey: '1a17742ab9338254c7dd39ecf85ee26cfdc82cb3', 
//     appName: 'KarmaPulse Client'
// });


/**
 * Module dependencies.
 */
var express = require('express'),
    fs = require('fs'),
    passport = require('passport'),
    logger = require('mean-logger'),
    _ = require('underscore'),
    twitter = require('ntwitter'),
    Gnip = require('gnip');

var app = express();

/**
 * Main application entry file.
 * Please note that the order of loading is important.
 */

// Load configurations
// Set the node enviornment variable if not set before
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

// Initializing system variables 
var config = require('./config/config'),
    mongoose = require('mongoose');

// Bootstrap db connection
var db = mongoose.connect(config.db);

// Bootstrap models
var models_path = __dirname + '/app/models';
var walk = function(path) {
    fs.readdirSync(path).forEach(function(file) {
        var newPath = path + '/' + file;
        var stat = fs.statSync(newPath);
        if (stat.isFile()) {
            if (/(.*)\.(js$|coffee$)/.test(file)) {
                require(newPath);
            }
        } else if (stat.isDirectory()) {
            walk(newPath);
        }
    });
};
walk(models_path);


// Bootstrap passport config
require('./config/passport')(passport);


// Express settings
require('./config/express')(app, passport, db);

// Bootstrap routes
var routes_path = __dirname + '/app/routes';
var walk = function(path) {
    fs.readdirSync(path).forEach(function(file) {
        var newPath = path + '/' + file;
        var stat = fs.statSync(newPath);
        if (stat.isFile()) {
            if (/(.*)\.(js$|coffee$)/.test(file)) {
                require(newPath)(app, passport);
            }
        // We skip the app/routes/middlewares directory as it is meant to be
        // used and shared by routes as further middlewares and is not a 
        // route by itself
        } else if (stat.isDirectory() && file !== 'middlewares') {
            walk(newPath);
        }
    });
};
walk(routes_path);




// Start the app by listening on <port>
var port = process.env.PORT || config.port;

//global.io = require('socket.io').listen(app.listen(port));
var redis = require('socket.io/node_modules/redis');
    global.io = require('socket.io').listen(app.listen(port));

console.log('Express app started on port ' + port);


/********* REDIS STORE FOR SOCKET.IO ****************/
/****************************************************/
var pub = redis.createClient(config.redisSocketsStore.port, config.redisSocketsStore.url);
var sub = redis.createClient(config.redisSocketsStore.port, config.redisSocketsStore.url);
var store = redis.createClient(config.redisSocketsStore.port, config.redisSocketsStore.url);
//pub.auth('pass', function(){console.log("adentro! pub")});
//sub.auth('pass', function(){console.log("adentro! sub")});
//store.auth('pass', function(){console.log("adentro! store")});
io.configure( function(){
    io.enable('browser client minification');  // send minified client
    io.enable('browser client etag');          // apply etag caching logic based on version number
    io.enable('browser client gzip');          // gzip the file
    io.set('log level', 1);                    // reduce logging
    io.set('transports', [                     // enable all transports (optional if you want flashsocket)
        'websocket'
      , 'flashsocket'
      , 'htmlfile'
      , 'xhr-polling'
      , 'jsonp-polling'
    ]);
    var RedisStore = require('socket.io/lib/stores/redis');
    io.set('store', new RedisStore({redisPub:pub, redisSub:sub, redisClient:store}));
});
/****************************************************/
/****************************************************/

// Initializing logger
logger.init(app, passport, mongoose);

// Expose app
exports = module.exports = app;





