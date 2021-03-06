angular.module('omdb', [])
    .factory('omdbApi', function($http, $q) {
        var service = {};
        var baseUrl = 'http://www.omdbapi.com/?v=1&';
        
        var httpPromise = (url) => {
            var deferred = $q.defer();
            $http.get(url)
                .then((response) => {
                    deferred.resolve(response.data);
                })
                .catch(() => {
                    this.errorMessage = 'Search was rejected';
                    deferred.reject();
                });
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