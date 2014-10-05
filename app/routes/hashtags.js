'use strict';

var hashtag = require('../controllers/hashtags');

module.exports = function(app) {
    //Registro
    app.get('/twitter/', hashtag.twitter);
};
