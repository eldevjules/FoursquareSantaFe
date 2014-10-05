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

};