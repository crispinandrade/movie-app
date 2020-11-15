// movieCore module is a dependency for the movieApp module
angular.module('movieApp')
    .controller('SearchController', ['$scope', '$location', '$timeout', function($scope, $location, $timeout) {
        var timeout;

        $scope.keyup = () => {
            timeout = $timeout($scope.search());
        }

        $scope.keydown = () => {
            $timeout.cancel(timeout);
        }

        $scope.search = () => {
            $timeout.cancel(timeout);

            if ($scope.query) {
                $location.path('/results').search('q', $scope.query);
            }
        }
    }]);