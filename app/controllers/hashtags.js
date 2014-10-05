'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
HashtagModel = mongoose.model('HashtagModel'),
	_ = require('lodash');


//Config
var config = require('../../config/config');

exports.twitter = function(req, res){
  HashtagModel.aggregate(
      { $group: 
        { _id: '$name', total: { $sum: 1  }  },
      },
      {$project: 
        {count: "$total"}
      }, 
      {$sort: 
        {count:  -1}
      },
      {$limit : 5},
      function (err, response) {
        if (err) return handleError(err);
		    res.jsonp({'hashtags': response});
      }
  );
}

