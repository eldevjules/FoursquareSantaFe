'use strict';

angular.module('mean', ['ngCookies', 'doowb.angular-pusher', 'ngResource', 'ngRoute', 'ui.bootstrap', 'ui.route', 'ngTagsInput', 'mean.system', 'mean.articles', 'mean.querys', 'mean.busquedas', 'mean.interpretes', 'mean.entrenamientos'], function ($interpolateProvider) {
    $interpolateProvider.startSymbol('{[{');
    $interpolateProvider.endSymbol('}]}');
});

angular.module('mean').config(['PusherServiceProvider',
  function(PusherServiceProvider) {
    PusherServiceProvider
      .setToken('bc196eec1dd00b8a13aa')
      .setOptions({});
  }
]);

angular.module('mean.system', []);
angular.module('mean.articles', []);
angular.module('mean.querys', []);
angular.module('mean.busquedas', []);
angular.module('mean.interpretes', []);
angular.module('mean.entrenamientos', []);