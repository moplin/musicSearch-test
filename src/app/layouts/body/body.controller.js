'use strict';

/**
 * @ngdoc function
 * @name BodyController
 * @module body
 * @kind function
 *
 * @description none yet
 *
 * Handles some stuff
 */
(function() {
    'use strict';

    angular
        .module('app.musicsearch')
        .controller('BodyController', BodyController);

    /* @ngInject */
    function BodyController() {
        var vm = this;
        vm.title = 'ehlo';
        vm.hero = {
            name: 'Miles Bronson'
        };

    }
})();
