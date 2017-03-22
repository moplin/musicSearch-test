(function() {
    'use strict';

    angular
        .module('app.musicsearch')
        .config(moduleConfig);

    /* @ngInject */
    function moduleConfig($stateProvider) {

        $stateProvider

            .state('index', {
                url: '/',
                views: {
                    'root': {
                        templateUrl: 'app/music-search/index/index.tmpl.html',
                        controller: 'IndexController',
                        controllerAs: 'vm'
                    }
                }
            });
    }

    })();


