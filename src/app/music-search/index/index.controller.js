(function() {
    'use strict';

    angular
        .module('app.musicsearch')
        .controller('IndexController', IndexController);

    /* @ngInject */
    function IndexController($log) {
        $log.log('++++++++++++++++++++++++++++++++++IndexController++');
        var vm = this;
        vm.hw = 'helloWorld';

    }
})();