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
            //Main app
            'app.music-search'
        ])
        .constant('API_CONFIG', {
            'url': '',
            'url-type':'',
            'debug':true
        });
})();
