'use strict';

angular.module('myApp', [
    'ui.router',
    'myApp.home'
])
    .config(function($stateProvider, $urlRouterProvider) {

        $urlRouterProvider.otherwise('/home');
        $stateProvider.state('home', {
                url: '/home',
                templateUrl: 'components/home/home.html',
                controller: 'HomeController'
            });

    }).run(function($rootScope) {

        $rootScope.$on('$stateChangeStart', function(e, toState, toParams, fromState, fromParams) {

        });

    });
