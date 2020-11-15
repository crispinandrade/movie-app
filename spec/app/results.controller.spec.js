describe('Results Controller', () => {
    var results = {
        "Search": [
            {
                "Title":"Batman Begins",
                "Year":"2005",
                "imdbID":"tt0372784",
                "Type":"movie"
            },
            {
                "Title":"The Dark Knight",
                "Year":"2008",
                "imdbID":"tt0468569",
                "Type":"movie"
            },
            {
                "Title":"The Dark Knight Rises",
                "Year":"2012",
                "imdbID":"tt1345836",
                "Type":"movie"
            }
        ]
    };

    var $controller, $scope;

    beforeEach(module('app'));

    beforeEach(inject((_$controller_, _$rootScope_) => {
        $controller = _$controller_;
        $scope = _$rootScope_.$new();

        var controller = $controller('ResultsController', { $scope: $scope});
    }));

    it('should loead search results', () => {
        expect($scope.results[0].data.Title).toBe(results.Search[0].Title);
        expect($scope.results[1].data.Title).toBe(results.Search[1].Title);
        expect($scope.results[2].data.Title).toBe(results.Search[2].Title);
    });
});