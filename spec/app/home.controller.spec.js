describe('Home Controller', () => {
    var results = [
        {
            "Title":"Batman Begins",
            "imdbID":"tt0372784"
        },
        {
            "Title":"The Dark Knight",
            "imdbID":"tt0468569"
        },
        {
            "Title":"The Dark Knight Rises",
            "imdbID":"tt1345836"
        }
    ];

    var $controller,
        $scope,
        omdbApi,
        PopularMovies,
        $interval;

    beforeEach(module('movieApp'));

    beforeEach(inject((_$q_, _PopularMovies_) => {
        spyOn(_PopularMovies_, 'get').and.callFake(() => {
            var deferred = _$q_.defer();
            deferred.resolve(['tt0372784', 'tt0468569', 'tt1345836']);

            return deferred.promise;
        });
    }));

    beforeEach(inject((_$q_, _omdbApi_) => {
        spyOn(_omdbApi_, 'find').and.callFake(() => {
            var deferred = _$q_.defer();
            var args = _omdbApi_.find.calls.mostRecent().args[0];
            if (args === 'tt0372784') {
                deferred.resolve(results[0]);
            } 
            else if (args === 'tt0468569') {
                deferred.resolve(results[1]);
            } 
            else if (args === 'tt1345836'){
                deferred.resolve(results[2]);
            } 
            else {
                return deferred.reject();
            }

            return deferred.promise;
        })
    }));

    beforeEach(inject((_$controller_, _$rootScope_, _$interval_, _omdbApi_, _PopularMovies_) => {
        $controller = _$controller_;
        $scope = _$rootScope_.$new();
        omdbApi = _omdbApi_;
        PopularMovies = _PopularMovies_;
        $interval = _$interval_;

        $controller('HomeController', { $scope: $scope, $interval: $interval});
    }));

    it('should rotate movies every 5 seconds', () => {
        $scope.$apply();
        expect($scope.result.Title).toBe(results[0].Title);
        $interval.flush(5000);
        expect($scope.result.Title).toBe(results[1].Title);
        $interval.flush(5000);
        expect($scope.result.Title).toBe(results[2].Title);
        $interval.flush(5000);
        expect($scope.result.Title).toBe(results[0].Title);
    });
});