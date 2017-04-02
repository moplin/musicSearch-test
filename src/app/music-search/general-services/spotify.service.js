/**
 * Created by moplin on 4/1/17.
 */
(function() {
    'use strict';

    angular
        .module('app.musicsearch')
        .factory('MSSpotifyService', MSSpotifyService);

    /**
     * Music Search Spotify service
     * @param $q
     * @param $log
     * @param $resource
     * @returns {{runPromise: runPromise, spotifyQuery: spotifyQuery, spotifyArtistQuery: spotifyArtistQuery}}
     * @constructor
     */
    function MSSpotifyService($q, $log, $resource) {

        return {
            runPromise: runPromise,
            spotifyQuery: spotifyQuery,
            spotifyArtistQuery: spotifyArtistQuery
        };

        /////////////////////
        // Functions

        /**
         * Just testing my service
         * @returns Promise
         */
        function runPromise() {
            return $q(function(resolve, reject) {
                resolve("working fine"); //just testing that works
            });
        }

        /**
         * Query Spotify endpoint
         * @param query
         * @returns promise
         */
        function spotifyQuery(query){
            $log.log('spotifyQuery()');
            return $q(function(resolve, reject) {
                var Query = $resource('https://api.spotify.com/v1/search?q=:q&type=album&market=EC', {q:query}); //artist,album
                var rs = Query.get(function() {
                    resolve(rs);
                });
            });
        }

        /**
         * Artist Spotify endpoint
         * @param id
         * @returns {*}
         */
        function spotifyArtistQuery(id){
            $log.log('spotifyArtistQuery(id)',id);
            return $q(function(resolve, reject) {
                var Query = $resource('https://api.spotify.com/v1/albums/:id', {id:id});
                var rs = Query.get(function() {
                    resolve(rs);
                });
            });
        }
    }
})();
