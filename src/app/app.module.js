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
            'ngResource',
            'ngAudio',
            'ngLodash',
            'angular-img-cropper',
            'picardy.fontawesome',
            //Main app
            'app.musicsearch'
        ])
        .constant('API_CONFIG', {
            'url': '',
            'url-type':'',
            'debug':true
        });
})();
