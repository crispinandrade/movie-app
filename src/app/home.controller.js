angular.module('movieApp')
    .controller('HomeController', ['$scope', '$interval', 'omdbApi', 'PopularMovies', function($scope, $interval, omdbApi, PopularMovies) {
        var results = [];
        var idx = 0;
        var findMovie = (id) => {
            omdbApi.find(id)
                .then((data) => {
                    $scope.result = data;
                });
        }

        PopularMovies.get()
            .then((data) => {
                results = data;
                findMovie(results[0]);

                $interval(() => {
                    ++idx;
                    findMovie(results[idx % results.length]);
                }, 5000);
            });
    }]);