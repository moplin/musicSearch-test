(function() {
    'use strict';

    angular
        .module('app')
        .run(runFunction);

    function runFunction($log, $rootScope, API_CONFIG, $state) { //$localStorage

        $log.log('runFunction');
        /*if ($localStorage.uData) {
            $http.defaults.headers.common.Authorization = 'Bearer ' + $localStorage.uData.token;
        }*/

        // Debug URL
        $rootScope.debug = API_CONFIG.debug;
        if(!API_CONFIG.debug){
            API_CONFIG.url = '';
        }

        function redirectError() {
            $state.go('500');
        }

        var errorHandle = $rootScope.$on('$stateChangeError', redirectError);
        $rootScope.$on('$destroy', function() {
            errorHandle();
        });
    }
})();
