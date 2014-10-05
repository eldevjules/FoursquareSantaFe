'use strict';

// Registro routes use usuarios controller
var FQ = require('../controllers/FQControllerExpress');

module.exports = function(app) {

    app.get('/', FQ.init);

    //Registro
    app.get('/soyunkamikaze/', FQ.registro);
    app.get('/callback/', FQ.callback);

    //Venues
    app.get('/explore/', FQ.explore);
    app.get('/trending/', FQ.trending);
    app.get('/here/', FQ.here);
    app.get('/venue/', FQ.venue);

    //Tops
     app.get('/kamikazes/', FQ.kamikazes);


};