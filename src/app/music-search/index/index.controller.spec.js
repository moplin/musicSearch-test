(function() {
    'use strict';

    describe('IndexController test', function() {

        beforeEach(module('app.musicsearch'));

        it('Scope should be isolate', inject(function($controller) {
            var vm = $controller('IndexController');
            expect(vm).toEqual(jasmine.any(Object));
        }));
    });
})();
