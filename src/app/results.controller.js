// movieCore module is a dependency for the movieApp module
angular.module('movieApp')
    .controller('ResultsController', ['$scope', '$location', 'omdbApi', function($scope, $location, omdbApi) {
        var query = $location.search().q;

        omdbApi.search(query)
            .then((response) => {
                $scope.results = response;
            })
            .catch(() => {
                $scope.errorMessage = 'Results was rejected';
            });
    }]);