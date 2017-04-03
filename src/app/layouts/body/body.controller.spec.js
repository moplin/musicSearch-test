/**
 * Created by moplin on 3/26/17.
 */
(function() {
    'use strict';

    describe('controllers', function() {

        beforeEach(module('app'));

        it('hw should be helloWorld', inject(function($controller) {
            var vm = $controller('IndexController');

            expect(vm.hw === 'helloWorld').toBeTruthy();

        }));

        it('Scope should be isolate', inject(function($controller) {
            var vm = $controller('IndexController');
            expect(vm).toEqual(jasmine.any(Object));
        }));
    });
})();
