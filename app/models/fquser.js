'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;


/**
 * FQ User
 */
var FQUserSchema = new Schema({
    
    token: String,
    userId: String,
    data: {},

}, { collection: 'pulse_fq_users' }, { autoIndex: false });

// Declaramos el indice ascendente
FQUserSchema.index({ userId: 1, type: 1 }); // schema level

/**
 * Statics
 */
FQUserSchema.statics.load = function(id, cb) {
    this.findOne({
        _id: id
    }).exec(cb);
};

mongoose.model('FQUser', FQUserSchema);
