(function() {
    'use strict';

    angular
        .module('app.musicsearch', [
        ]);
})();
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
/**
 * Created by moplin on 4/1/17.
 */
(function() {
    'use strict';

    angular
        .module('app.musicsearch')
        .factory('MSSpotifyService', MSSpotifyService);

    /**
     * Music Search Spotify service «factory»
     * @param $q
     * @param $log
     * @param $resource
     * @returns {{runPromise: runPromise, spotifyQuery: spotifyQuery, spotifyArtistQuery: spotifyArtistQuery}}
     * @constructor
     */
    /* @ngInject */
    function MSSpotifyService($q, $log, $resource) {
        //KISS - just return the functions
        return {
            runPromise: runPromise,
            spotifyQuery: spotifyQuery,
            spotifyArtistQuery: spotifyArtistQuery,
            spotifyTopTracks: spotifyTopTracks,
            spotifyArtistAlbums: spotifyArtistAlbums,
            spotifyAlbumTracks:spotifyAlbumTracks
        };

        /////////////////////
        // Functions

        /**
         * Just testing my service
         * @returns Promise
         */
        function runPromise() {
            return $q(function(resolve) {
                resolve('working fine'); //just testing that works
            });
        }

        /**
         * GET Query Spotify
         * @param query
         * @param page
         * @returns promise
         */
        function spotifyQuery(query, page){
            var qpage = 0;
            if(typeof page !== 'undefined'){qpage = page;}
            $log.log('spotifyQuery()',qpage);
            return $q(function(resolve) {
                var Query = $resource('https://api.spotify.com/v1/search?q=:q&type=artist,album&market=EC&limit=8&offset=:qpage', {q:query, qpage:qpage}); //artist,album
                var rs = Query.get(function() {
                    resolve(rs);
                });
            });
        }

        /**
         * GET Artist
         * @param artistId
         * @returns promise
         */
        function spotifyArtistQuery(artistId){
            $log.log('spotifyArtistQuery(artistId)',artistId);
            return $q(function(resolve) {
                var Query = $resource('https://api.spotify.com/v1/albums/:artistId', {artistId:artistId});
                var rs = Query.get(function() {
                    resolve(rs);
                });
            });
        }

        /**
         * GET Top Tracks from Artist
         * @param artistId
         * @returns promise
         */
        function spotifyTopTracks(artistId) {
            $log.log('spotifyTopTracks(artistId)',artistId);
            return $q(function(resolve) {
                var Query = $resource('https://api.spotify.com/v1/artists/:artistId/top-tracks?country=EC', {artistId:artistId});
                var rs = Query.get(function() {
                    resolve(rs);
                });
            });
        }

        /**
         * GET the artist albums list
         * @param artistId
         * @returns promise
         */
        function spotifyArtistAlbums(artistId) {
            $log.log('spotifyArtistAlbums(artistId)',artistId);
            return $q(function(resolve) {
                var Query = $resource('https://api.spotify.com/v1/artists/:artistId/albums?market=ES&album_type=album&limit=8', {artistId:artistId});
                var rs = Query.get(function() {
                    resolve(rs);
                });
            });
        }

        function spotifyAlbumTracks(albumId) {
            $log.log('spotifyAlbumTracks(albumId)',albumId);
            return $q(function(resolve) {
                var Query = $resource('https://api.spotify.com/v1/albums/:albumId/tracks', {albumId:albumId});
                var rs = Query.get(function() {
                    resolve(rs);
                });
            });
        }


    }
})();

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

'use strict';

/**
 * @ngdoc function
 * @name BodyController
 * @module body
 * @kind function
 *
 * @description none yet
 *
 * Handles some stuff
 */
(function() {
    'use strict';

    angular
        .module('app.musicsearch')
        .controller('BodyController', BodyController);

    /* @ngInject */
    function BodyController() {

    }
})();

(function () {
    'use strict';

    angular
        .module('app.musicsearch')
        .config(moduleConfig);

    /* @ngInject */
    function moduleConfig($stateProvider) {

        $stateProvider

            .state('index', {
                url: '/',
                views: {
                    'root': {
                        templateUrl: 'app/music-search/index/index.tmpl.html',
                        controller: 'IndexController',
                        controllerAs: 'vm'
                    }
                }
            });
    }
})();
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

(function() {
    angular
        .module('app')
        .controller('ErrorPageController', ErrorPageController);

    /* @ngInject */
    function ErrorPageController($location) {
        var vm = this;
        vm.goHome = goHome;

        /////////
        function goHome() {
            $location.path('/');
        }
    }
})();

(function() {
    'use strict';

    angular
        .module('app')
        .config(routeConfig);

    /* @ngInject */
    function routeConfig($stateProvider, $urlRouterProvider) {

        $stateProvider
            .state('404', {
                url: '/404',
                views: {
                    'root': {
                        templateUrl: '404.tmpl.html',
                        controller: 'ErrorPageController',
                        controllerAs: 'vm'
                    }
                }
            })

            .state('401', {
                url: '/401',
                views: {
                    'root': {
                        templateUrl: '401.tmpl.html',
                        controller: 'ErrorPageController',
                        controllerAs: 'vm'
                    }
                }
            })

            .state('500', {
                url: '/500',
                views: {
                    'root': {
                        templateUrl: '500.tmpl.html',
                        controller: 'ErrorPageController',
                        controllerAs: 'vm'
                    }
                }
            });
        $urlRouterProvider.when('', '/');
        $urlRouterProvider.when('/', '/');
        $urlRouterProvider.otherwise('/404');
    }
})();

(function() {
    'use strict';

    angular
        .module('app')
        .run(runFunction);

    function runFunction($log, $rootScope, API_CONFIG, $state) { //$localStorage

        $log.log('runFunction');
        /*if ($localStorage.uData) {
            $http.defaults.headers.common.Authorization = 'Bearer ' + $localStorage.uData.token;
        }*/

        // Debug URL
        $rootScope.debug = API_CONFIG.debug;
        if(!API_CONFIG.debug){
            API_CONFIG.url = '';
        }

        function redirectError() {
            $state.go('500');
        }

        var errorHandle = $rootScope.$on('$stateChangeError', redirectError);
        $rootScope.$on('$destroy', function() {
            errorHandle();
        });
    }
})();

angular.module('app').run(['$templateCache', function($templateCache) {$templateCache.put('app/layouts/body/body.tmpl.html','<div>\n    <div ui-view="content"></div>\n</div>');
$templateCache.put('app/music-search/index/index.tmpl.html','\n<div class="ms-row" id="ms-serach-bar">\n    <div class="ms-col-12 cent-dv">\n            <span id="ms-search-span-parent">\n                    <div id="ms-searchbox-container" class="centre-sc">\n                        <input id="ms-search-input" type="text" placeholder="Search for artist or album title"\n                               ng-model="vm.query" my-enter="vm.searchSP(vm.query, 0)">\n                        <span id="ms-button-box">\n                            <button id="ms-search-button"  type="submit"\n                                    ng-click="vm.searchSP(vm.query, 0)">\n                                Search\n                            </button>\n                        </span>\n                    </div>\n            </span><br/>\n    </div>\n</div>\n<div class="ms-row" id="ms-search-results">\n    <br>\n    <!--model card Artist-->\n    <div class="ms-col-4 cent-dv" ng-repeat="artist in vm.artists">\n        <div class="card center-card">\n            <div class="card-img-container" >\n                <a ng-click="vm.openModal(artist.type,artist)" class="card-a">\n                    <div class="ms-main-img-cointainer">\n                        <img ng-src="{{vm.showImg(artist.images[0].url)}}" class="card-img"> <!-- vm.showHolder -->\n                    <div class="indicator-icon">\n                        <img src="assets/images/artist-icon@2x.png" class="card-indicator-icon"/>\n                    </div> <!--INDICADOR ALBUM/ARTISTA-->\n                    </div>\n                    <div class="play">\n                        <a ng-click="vm.openModal(artist.type,artist)">\n                            <img src="assets/images/Bitmap@2x.png" class="card-img-play"/>\n                            <br>\n                            <span class="card-hov-txt">View Albums</span>\n                        </a>\n                    </div>\n                </a>\n            </div>\n            <div class="container" style="display: flex;align-items:center;">\n                <span class="card-text">{{(artist.name | limitTo: 30) + (artist.name.length > 30 ? \'...\' : \'\')}}</span>\n            </div>\n        </div>\n    </div>\n    <!--//model card-->\n    <!--model card Album-->\n    <div class="ms-col-4 cent-dv" ng-repeat="album in vm.albums">\n        <div class="card center-card">\n            <div class="card-img-container" >\n                <a ng-click="vm.openModal(album.type,album)" class="card-a">\n                    <div class="ms-main-img-cointainer">\n                        <img ng-src="{{vm.showImg(album.images[0].url)}}" class="card-img"> <!-- vm.showHolder -->\n\n\n                    <div class="indicator-icon">\n                        <img src="assets/images/album-icon@2x.png" class="card-indicator-icon"/>\n                    </div> <!--INDICADOR ALBUM/ARTISTA-->\n                    </div>\n                    <div class="play">\n                        <a ng-click="vm.openModal(album.type,album)">\n                            <img src="assets/images/Bitmap@2x.png" class="card-img-play"/>\n                            <br>\n                            <span class="card-hov-txt">View Tracks</span>\n                        </a>\n                    </div>\n                </a>\n            </div>\n            <div class="container" style="display: flex;align-items:center;">\n                <span class="card-text" >{{(album.name | limitTo: 30) + (album.name.length > 30 ? \'...\' : \'\')}}</span>\n            </div>\n        </div>\n    </div>\n    <!--//model card-->\n\n    <div class="ms-col-12 ccenter " ng-show="vm.noItems()" >\n            <img src="assets/images/Magnify@2x.png" class="magnify"  align="center" /> <br>\n    </div>\n    <div class="ms-col-12 ccenter findme" ng-show="vm.noItems()">\n        <br class="findme"><br class="findme"><br class="findme">\n        <span style="color: #454756; font-size: 20px;" class="findme">Your results will appear here</span>\n    </div>\n    <div class="ms-col-12"  ng-hide="vm.noItems()">\n        <br><br>\n        <a style="cursor:hand" class="ms-button-reg" ng-click="vm.searchSP(vm.query, vm.page = vm.page+8)"> SHOW ME MORE </a>\n        <br><br><br><br><br>\n    </div>\n</div>\n<div class="ms-row" id="ms-search-foot">\n    <div class="ms-col-12" style=" text-align: center;"><br>\n        <span id="ms-id-footer-txt" >Designed by Gook Label - Powered by Spotify</span>\n    </div>\n</div>\n\n\n\n\n\n\n\n\n\n\n\n<!--MODALES-->\n<easy-modal reset-template="true" ng-if="vm.easyModal.status(\'albumModal\')">\n    <div class="modal-head">\n        <div class="ms-row">\n            <div class="ms-col-3 md-cls" id="ms-mod-col4">\n                <div class="modal-img-container">\n                    <div class="modal-img" style="content:url(\'{{vm.albumModal.img}}\');"></div>\n                </div>\n            </div>\n            <div class="ms-col-8 center-col"  style="text-align: left" id="ms-mod-col5">\n                <br>\n                <span class="modal-t1">Tracks on <br><span class="modal-t2">{{vm.albumModal.name}}</span></span>\n            </div>\n            <div class="ms-col-1 md-cls" id="ms-mod-col6">\n                <div class="modal-cross" ng-click="vm.easyModal.close()"></div>\n            </div>\n        </div>\n    </div>\n    <br><br>\n    <span ng-if="vm.albumModal.tracks.length >= 1">\n        <div class="modal-track" style="text-align: left; padding: 8px"  ng-repeat="tra in vm.albumModal.tracks">\n            <a ng-click="vm.player(tra)" style="cursor: pointer; cursor: hand;"><span class="track"><i class="{{vm.playerIcon()}}" aria-hidden="true"></i> {{tra.name}}</span></a>\n        </div>\n    </span>\n    <span ng-if="vm.albumModal.tracks.length <= 0">\n        <div class="modal-track" style="text-align: left; padding: 8px">\n            <span class="track">Sorry no tracks found</span>\n        </div>\n    </span>\n\n    <br>\n</easy-modal>\n\n\n\n\n<easy-modal reset-template="true" ng-if="vm.easyModal.status(\'artistModal\')" >\n    <div class="modal-head">\n        <div class="ms-row">\n            <div class="ms-col-3 md-cls" id="ms-mod-col1">\n                <div class="modal-img-container">\n                    <div class="modal-img" style="content:url(\'{{vm.artistModal.img}}\');"></div>\n                </div>\n            </div>\n            <div class="ms-col-8 center-col"  style="text-align: left" id="ms-mod-col2">\n                <br>\n                <span class="modal-t1">Albums of <br><span class="modal-t2">{{vm.artistModal.name}}</span></span>\n            </div>\n            <div class="ms-col-1 md-cls" id="ms-mod-col3">\n                <div class="modal-cross" ng-click="vm.easyModal.close()"></div>\n            </div>\n        </div>\n    </div>\n    <br><br>\n    <span ng-if="vm.artistModal.artistAlbums.length >= 1">\n        <div class="modal-track" style="text-align: left; padding: 8px"  ng-repeat="alb in vm.artistModal.artistAlbums">\n            <span class="track">{{alb.name}}</span>\n        </div>\n    </span>\n    <span ng-if="vm.artistModal.artistAlbums.length <= 0">\n        <div class="modal-track" style="text-align: left; padding: 8px">\n            <span class="track">Sorry no Albums found</span>\n        </div>\n    </span>\n\n    <br>\n</easy-modal>\n\n');}]);