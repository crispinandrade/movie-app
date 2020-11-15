// movieCore module is a dependency for the movieApp module
angular.module('movieApp')
    .controller('ResultsController', ['$scope', '$location', function($scope, $location) {
        $scope.results = [];
        $scope.results.push({ data: { Title: 'Batman Begins' }});
        $scope.results.push({ data: { Title: 'The Dark Knight' }});
        $scope.results.push({ data: { Title: 'The Dark Knight Rises' }});
    }]);