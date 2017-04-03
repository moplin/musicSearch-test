(function() {
    angular
        .module('app')
        .controller('ErrorPageController', ErrorPageController);

    /* @ngInject */
    function ErrorPageController($location) {
        var vm = this;
        vm.goHome = goHome;

        /////////
        function goHome() {
            $location.path('/');
        }
    }
})();
