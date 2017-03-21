(function() {
    'use strict';

    angular
        .module('app.music-search')
        .controller('IndexController', IndexController);

    /* @ngInject */
    function IndexController($log) {
        $log.log('++++++++++++++++++++++++++++++++++IndexController++');
        var vm = this;
        vm.hw = ['helloWorld'];

    }
})();