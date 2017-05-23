/**
 * Created by moplin on 3/26/17.
 */
(function() {
    'use strict';


    describe('Controllers: ', function() {

        beforeEach(module('app'));
        beforeEach(module('app.musicsearch'));

        console.log(module('app'));

        describe('IndexController', function() {

            var testController, scope;

            console.log('testController',testController);

            beforeEach(inject(function($controller) {
                scope = {};
                testController = $controller('IndexController', {
                    $scope: scope
                });
            }));

            it('should be defined', function() {
                expect(testController).toBeDefined();
            });

            it('should not have a property called vm', function() {
                expect(testController.vm).toBeUndefined();
            });

        });
    });




})();
