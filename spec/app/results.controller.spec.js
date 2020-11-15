describe('Results Controller', () => {
    var results = [
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
        ];

    var $controller, 
        $scope,
        $q,
        $location,
        omdbApi;

    beforeEach(module('omdb'));
    beforeEach(module('movieApp'));

    beforeEach(inject((_$controller_, _$rootScope_, _$q_, _$location_, _omdbApi_) => {
        $controller = _$controller_;
        $scope = _$rootScope_.$new();
        $q = _$q_;
        $location = _$location_;
        omdbApi = _omdbApi_;

        // why doesn't this work in beforeEach?
        // $controller('ResultsController', { $scope: $scope, $rootScope: $rootScope, $location: $location, omdbApi: omdbApi});
    }));

    it('should load search results', () => {
        spyOn(omdbApi, 'search').and.callFake(function() {
            var deferred = $q.defer();
            deferred.resolve(results);
            
            return deferred.promise;
        });

        $controller('ResultsController', { $scope: $scope, omdbApi: omdbApi });

        $location.search({'q': 'batman'});

        $scope.results = results;
        expect($scope.results[0].Title).toBe(results[0].Title);
        expect($scope.results[1].Title).toBe(results[1].Title);
        expect($scope.results[2].Title).toBe(results[2].Title);

        expect($location.absUrl()).toContain('q=batman')
    });

    it('should set result status to error', () => {
        spyOn(omdbApi, 'search').and.callFake(function() {
            var deferred = $q.defer();
            deferred.reject();
            
            return deferred.promise;
        });

        $controller('ResultsController', { $scope: $scope, omdbApi: omdbApi });

        $location.search({'q': 'batman'});
        $scope.$apply();
        
        expect($scope.errorMessage).toBe('Results was rejected');
        
    });
});