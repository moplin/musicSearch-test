/**
 * Created by moplin on 4/1/17.
 */
(function () {
    'use strict';
    /* @ngInject */
    angular
        .module('app.musicsearch')
        .directive('myEnter', function () {
            /**
             * Uses de Enter Key Press to run code
             */
            return function (scope, element, attrs) {
                element.bind('keydown keypress', function (event) {
                    if (event.which === 13) {
                        scope.$apply(function () {
                            scope.$eval(attrs.myEnter);
                        });
                        event.preventDefault();
                    }
                });
            };
        });
})();
