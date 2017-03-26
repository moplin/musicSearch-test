(function() {
    'use strict';

    describe('controllers', function() {

        beforeEach(module('app'));

        it('Scope should be isolate', inject(function($controller) {
            var vm = $controller('BodyController');
            expect(vm).toEqual(jasmine.any(Object));
        }));
    });
})();
