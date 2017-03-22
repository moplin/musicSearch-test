(function() {
    angular
        .module('app')
        .controller('ErrorPageController', ErrorPageController);

    /* @ngInject */
    function ErrorPageController($log, $location) {
        $log.log('ErrorPageController');
        var vm = this;
        vm.goHome = goHome;

        /////////
        function goHome() {
            $log.log('ET go home');
            //$state.go('authentication.login');
            //$localStorage.$reset();
            //$cookies.remove('fm-user');
            //$cookies.remove('io');
            //$http.defaults.headers.common.Authorization = '';
            $location.path('/');
        }
    }
})();
