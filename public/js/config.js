'use strict';

//Setting up route
angular.module('mean').config(['$routeProvider',
    function($routeProvider) {
        $routeProvider.
        when('/articles', {
            templateUrl: '../views/articles/list.html'
        }).
        when('/articles/create', {
            templateUrl: '../views/articles/create.html'
        }).
        when('/articles/:articleId/edit', {
            templateUrl: '../views/articles/edit.html'
        }).
        when('/articles/:articleId', {
            templateUrl: '../views/articles/view.html'
        }).
        when('/querys', {
            templateUrl: '../views/querys/list.html'
        }).
        when('/querys/create', {
            templateUrl: '../views/querys/create.html'
        }).
        when('/querys/:queryId/edit', {
            templateUrl: '../views/querys/edit.html'
        }).
        when('/querys/:queryId', {
            templateUrl: '../views/querys/view.html'
        }).
        when('/busquedas', {
            templateUrl: '../views/busquedas/list.html'
        }).
        when('/busquedas/create', {
            templateUrl: '../views/busquedas/create.html'
        }).
        when('/busquedas/:busquedaId/edit', {
            templateUrl: '../views/busquedas/edit.html'
        }).
        when('/busquedas/:busquedaId', {
            templateUrl: '../views/busquedas/view.html'
        }).
        when('/interpretes', {
            templateUrl: '../views/interpretes/list.html'
        }).
        when('/interpretes/create', {
            templateUrl: '../views/interpretes/create.html'
        }).
        when('/interpretes/:interpreteId/edit', {
            templateUrl: '../views/interpretes/edit.html'
        }).
        when('/interpretes/:interpreteId', {
            templateUrl: '../views/interpretes/view.html'
        }).
        when('/entrenamientos', {
            templateUrl: '../views/entrenamientos/index.html'
        }).
        when('/interpretaciones', {
            templateUrl: '../views/interpretaciones/list.html'
        }).
        when('/interpretaciones/create', {
            templateUrl: '../views/interpretaciones/create.html'
        }).
        when('/interpretaciones/:articleId/edit', {
            templateUrl: '../views/interpretaciones/edit.html'
        }).
        when('/interpretaciones/:articleId', {
            templateUrl: '../views/interpretaciones/view.html'
        }).
        when('/', {
            templateUrl: '../views/index.html'
        }).
        otherwise({
            redirectTo: '/'
        });
    }
]);

//Setting HTML5 Location Mode
angular.module('mean').config(['$locationProvider',
    function($locationProvider) {
        $locationProvider.html5Mode(false).hashPrefix('!');
    }
]);