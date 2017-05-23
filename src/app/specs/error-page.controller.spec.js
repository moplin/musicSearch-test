(function() {
    'use strict';

    describe('Testing ErrorPageController PI:: ', function() {

        beforeEach(angular.mock.module('app'));

        var $controller;

        beforeEach(angular.mock.inject(function(_$controller_){
            $controller = _$controller_;
        }));


        // it('goHome should be function', inject(function($controller) {
        //     var vm = $controller('ErrorPageController');
        //     expect(typeof vm.goHome).toBe('function');
        // }));



        // it('Scope should be isolate', inject(function($controller) {
        //     var vm = $controller('ErrorPageController');
        //     expect(vm).toEqual(jasmine.any(Object));
        // }));
    });

    // describe('Testing ErrorPageController PII', function() {
    //     var vm, rootScope, location;
    //
    //     beforeEach(module('app'));
    //
    //     beforeEach(inject(function($location, $rootScope, $controller) {
    //         location = $location;
    //         rootScope = $rootScope;
    //
    //         vm = $controller('ErrorPageController');
    //     }));
    //
    //     it('should change location when setting it via show function', inject(function() {
    //         location.path('/new/path');
    //         rootScope.$apply();
    //         vm.goHome();
    //         expect(location.path()).toBe('/');
    //     }));
    // });



})();