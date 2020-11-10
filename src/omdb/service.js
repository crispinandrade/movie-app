angular.module('omdb', [])
    .factory('omdbApi', ($http, $q) => {
        var service = {};
        var baseUrl = 'http://www.omdbapi.com/?v=1&';
        
        var httpPromise = (url) => {
            var deferred = $q.defer();
            $http.get(url)
                .then((data) => {
                    deferred.resolve(data);
                    console.log("HELOOOOOO1111:   ");
                });
                console.log("HELOOOOOO:   " + deferred.promise);
            return deferred.promise;
        }

        service.search = (query) => {
            return httpPromise(baseUrl + 's=' + query);
        }

        service.find = (id) => {
            return httpPromise(baseUrl + 'i=' + id);
        }

        return service;
    })