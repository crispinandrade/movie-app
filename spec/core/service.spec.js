describe('omdb service', () => {
    var PopularMovies;
    var $httpBackend;

    // mocks module data 
    beforeEach(module('movieCore'));

    // creates instance of the module data
    beforeEach(inject((_PopularMovies_, _$httpBackend_) => {
        PopularMovies = _PopularMovies_;
        $httpBackend = _$httpBackend_;
    }));

    afterEach(() => {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });

    it('should create popular movie', () => {
        //{"movieId":"tt2294629","description":"Nice movie!"}
        var expectedData = (data) => {
            return angular.fromJson(data).movieId === 'tt2294629';
        }

        $httpBackend.expectPOST(/./, expectedData)
            .respond(201);

        var popularMovie = new PopularMovies({
            movieId: 'tt2294629',
            description: 'Nice movie!'
        });

        popularMovie.$save();

        expect($httpBackend.flush).not.toThrow();
    });  

    it('should get popular movie by id', () => {
        //{"movieId":"tt2294629","description":"Nice movie!"}
        $httpBackend.expectGET('popular/tt2294629')
            .respond(200);

        PopularMovies.get({ movieId: 'tt2294629' });
        expect($httpBackend.flush).not.toThrow();

    });  

    it('should update popular movie', () => {
        $httpBackend.expectPUT('popular')
            .respond(200);
        
        var popularMovie = new PopularMovies({
            movieId: 'tt2294629',
            description: 'Nice movie!'
        });

        popularMovie.$update();
        expect($httpBackend.flush).not.toThrow();
    });

    it('should authenticate requests', () => {
        // '{
        //     "authToken": "myToken",
        //     "Accept": "application/json, text/plain, */*"
        //   }'
        var headerData = (headers) => {
            return headers.authToken === "myToken";
        };

        var matchAny = /.*/;

        $httpBackend.whenGET(matchAny, headerData)
            .respond(200);

        $httpBackend.expectPOST(matchAny, matchAny, headerData)
            .respond(200);

        $httpBackend.expectPUT(matchAny, matchAny, headerData)
            .respond(200);

        $httpBackend.expectDELETE(matchAny, headerData)
            .respond(200);

        var popularMovie = {
            id: 'tt2294629',
            description: 'Nice movie!'
        };

        PopularMovies.query();
        PopularMovies.get({ id: 'tt2294629' });
        new PopularMovies(popularMovie).$save();
        new PopularMovies(popularMovie).$update();
        new PopularMovies(popularMovie).$remove();

        expect($httpBackend.flush).not.toThrow();
    });
});