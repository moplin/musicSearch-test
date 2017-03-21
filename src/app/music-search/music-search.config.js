(function() {
    'use strict';

    angular
        .module('app.music-search')
        .config(moduleConfig);

    /* @ngInject */
    function moduleConfig($stateProvider) {

        $stateProvider
            .state('music-search.music-search', {
                abstract: true,
                views: {
                },
                data: {
                }
            })

        .state('music-search.index', {
            url: '/index',
            templateUrl: 'app/music-search/index.tmpl.html',
            controller: 'IndexController',
            controllerAs: 'vm'
        });
    }
})();
