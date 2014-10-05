'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;


/**
 * Hashtag
 */
var HashtagSchema = new Schema({
    name: String,
}, { collection: 'hashtag' }, { autoIndex: false });


mongoose.model('HashtagModel', HashtagSchema);
