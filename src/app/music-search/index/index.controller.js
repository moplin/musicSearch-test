(function() {
    'use strict';

    angular
        .module('app.musicsearch')
        .controller('IndexController', IndexController);

    /* @ngInject */
    function IndexController($log, EasyModalDelegate) {
        $log.log('++++++++++++++++++++++++++++++++++IndexController++');
        var vm = this;
        vm.hw = 'Powered by Spotify';



        vm.easyModal = EasyModalDelegate;
        vm.title = 'Hello kitty';

        vm.t = 'Alberta Clark';
        vm.img = '/assets/images/tst.png';
        vm.albums = [{album:'Litle F', year:'2017'},{album:'big F', year:'2016'}];


        /**
         * Sets up modal object for album
         * @type {{status: string, title: string, body: string, img: string, clickOut: boolean, albums: (*)}}
         */
        vm.albumModal = {
            status: 'albumModal',
            title: vm.t,
            body: 'Albums',
            img: vm.img,
            clickOut: false,
            albums: vm.albums
        };
        /**
         * Sets up modal object for artist
         * @type {{status: string, title: string, body: string, img: string, clickOut: boolean, albums: (*)}}
         */
        vm.artistModal = {
            status: 'artistModal',
            title: vm.t,
            body: 'Artist',
            img: vm.img,
            clickOut: false,
            albums: vm.albums
        };
        //////////////////
        // Load functions
        vm.openModal = openModal;

        /////////////////
        // Functions

        /**
         * Opnes modal window based on type «album | artist»
         * @param type
         * @param id
         * @returns {string} type always
         */
        function openModal(type, id) {
            $log.log('type, id',type, id);
            (type === 'album')?vm.easyModal.show(vm.albumModal):vm.easyModal.show(vm.artistModal);
            return type;
        }
    }
})();