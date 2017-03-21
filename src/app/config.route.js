(function() {
    'use strict';

    angular
        .module('app')
        .config(routeConfig);

    /* @ngInject */
    function routeConfig($stateProvider, $urlRouterProvider) {

        $stateProvider
            .state('404', {
                url: '/404',
                views: {
                    'root': {
                        templateUrl: '404.tmpl.html',
                        controller: 'ErrorPageController',
                        controllerAs: 'vm'
                    }
                }
            })

            .state('401', {
                url: '/401',
                views: {
                    'root': {
                        templateUrl: '401.tmpl.html',
                        controller: 'ErrorPageController',
                        controllerAs: 'vm'
                    }
                }
            })

            .state('500', {
                url: '/500',
                views: {
                    'root': {
                        templateUrl: '500.tmpl.html',
                        controller: 'ErrorPageController',
                        controllerAs: 'vm'
                    }
                }
            });
        $urlRouterProvider.when('', '/index');
        $urlRouterProvider.when('/', '/index');
        $urlRouterProvider.otherwise('/404');
    }
})();
