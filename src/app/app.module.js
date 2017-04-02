(function () {
    'use strict';

    angular
        .module('app', [
            'ui.router',
            'ngAnimate',
            'ngCookies',
            'ngSanitize',
            'ngMessages',
            'angularMoment',
            'ngStorage',
            'ngEasyModal',
            //Main app
            'app.musicsearch'
        ])
        .constant('API_CONFIG', {
            'url': '',
            'url-type':'',
            'debug':true
        });
})();
