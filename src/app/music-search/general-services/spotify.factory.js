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
