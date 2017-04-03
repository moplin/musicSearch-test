(function() {
    'use strict';

    angular
        .module('app.musicsearch')
        .controller('IndexController', IndexController);

    /* @ngInject */
    function IndexController(lodash, EasyModalDelegate, MSSpotifyService, ngAudio) {
        var vm = this;
        vm.hw = 'Powered by Spotify';
        vm.query = '';
        vm.artists = [];
        vm.albums = [];
        vm.artistAlbums = [];
        vm.topTracks = [];
        vm.albumModal = {};
        vm.artistModal = {};
        vm.albumsTracks = [];
        vm.page = 0;
        vm.playing=false;
        vm.easyModal = EasyModalDelegate;

        //////////////////
        // Load functions
        vm.openModal = openModal;
        vm.searchSP = searchSP;
        vm.player = player;
        vm.showImg = showImg;
        vm.noItems = noItems;
        vm.player = player;
        vm.playerIcon = playerIcon;
        /////////////////
        // Functions

        /**
         * Lets clip images
         * @param img
         * @returns {*}
         */
        function showImg(img) {
            if(typeof img !== 'undefined' ){
                return img;
            } else {
                return vm.showHolder;
            }
        }

        function noItems() {
            return !(vm.albums.length >= 1 || vm.artists.length >= 1 );
        }

        /**
         * Opnes modal window based on type «album | artist»
         * @param type
         * @param obj
         * @returns {string} type always
         */
        function openModal(type, obj) {
            if (type === 'album'){
                MSSpotifyService.spotifyAlbumTracks(obj.id).then(function (data) {
                    vm.albumsTracks = data.items;

                    vm.albumModal = {
                        status: 'albumModal',
                        body: 'Albums',
                        clickOut: false,
                        name: obj.name,
                        img: obj.images[0].url,
                        tracks: vm.albumsTracks
                    };
                    vm.easyModal.show(vm.albumModal);
                });
            }

            if (type === 'artist'){
                MSSpotifyService.spotifyArtistAlbums(obj.id).then(function(data){
                    vm.artistAlbums = data.items;
                    vm.artistModal = {
                        status: 'artistModal',
                        name: obj.name,
                        body: 'Albums',
                        img: obj.images[0].url,
                        clickOut: false,
                        artistAlbums: vm.artistAlbums
                    };
                    vm.easyModal.show(vm.artistModal);
                });

            }
            return type;
        }

        /**
         * Query spotify
         * @param page
         * @param query
         */
        function searchSP(query, page){
            if(page===0){vm.artists = []; vm.albums = [];} //cleaning
            MSSpotifyService.spotifyQuery(query, page).then(function(result) {
                var art = lodash.filter(result.artists.items, function(o) { return o.images.length > 0; });
                var alb = lodash.filter(result.albums.items, function(o) { return o.images.length > 0; });
                vm.artists = lodash.concat(vm.artists, art);
                vm.albums = lodash.concat(vm.albums, alb);
            });
            return 'ok';
        }


        /**
         * Plays the preview track
         * @param trackObj
         */
        function player(trackObj){
            if(!vm.stop){
                vm.sound = ngAudio.load(trackObj.preview_url);
                vm.playClass = 'playing';
                vm.stop = !vm.stop;
                vm.sound.play();
                vm.playing = true;
            }else {
                vm.playClass = '';
                vm.stop = !vm.stop;
                vm.sound.stop();
                vm.playing = false;
            }
        }

        /**
         * switches de icosn
         * @returns {string}
         */
        function playerIcon() {
            // TODO I need to fix it so it will show it on the song not all
            if(!vm.playing){
                return 'fa fa-play-circle';
            } else {
                return 'fa fa-pause-circle';
            }
        }
    }
})();