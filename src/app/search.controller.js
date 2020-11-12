// movieCore module is a dependency for the movieApp module
angular.module('movieApp', [])
    .controller('SearchController', ['$scope', '$location', ($scope, $location) => {
        $scope.search = () => {
            if ($scope.query) {
                $location.path('/results').search('q', $scope.query);
            }
        }
    }]);