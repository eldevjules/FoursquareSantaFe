'use strict';

var mongoose = require('mongoose'),
    Registro = mongoose.model('Registro'),
    Busqueda = mongoose.model('Busqueda'),
    _ = require('lodash'),
    async = require('async');

var googleapis = require('googleapis');

//http://dannysu.com/2014/01/16/google-api-service-account/
var SERVICE_ACCOUNT_EMAIL = '480152960989-pmvgl3u6bnkn727bh85kmqnr6mp73ioe@developer.gserviceaccount.com';
var SERVICE_ACCOUNT_KEY_FILE = './googleapi-privatekey.pem';
var jwt = new googleapis.auth.JWT(
        SERVICE_ACCOUNT_EMAIL,
        SERVICE_ACCOUNT_KEY_FILE,
        null,
        ['https://www.googleapis.com/auth/prediction', 
        'https://www.googleapis.com/auth/devstorage.full_control',
        'https://www.googleapis.com/auth/devstorage.read_only',
        'https://www.googleapis.com/auth/devstorage.read_write']);

var _ = require('lodash');


exports.landing = function(req, res) {
    res.render('landing');
};

exports.render = function(req, res) {
    res.render('index', {
        user: req.user ? JSON.stringify(req.user) : 'null'
    });
};

exports.chat = function(req, res) {
    res.render('chat', { data: '' });
};


