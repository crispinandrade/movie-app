describe('omdb service', () => {
    var omdbApi = {};
    var $httpBackend;
    var movieData = {"Title":"Batman","Year":"1989","Rated":"PG-13","Released":"23 Jun 1989","Runtime":"126 min","Genre":"Action, Adventure","Director":"Tim Burton","Writer":"Bob Kane (Batman characters), Sam Hamm (story), Sam Hamm (screenplay), Warren Skaaren (screenplay)","Actors":"Michael Keaton, Jack Nicholson, Kim Basinger, Robert Wuhl","Plot":"The Dark Knight of Gotham City begins his war on crime with his first major enemy being Jack Napier, a criminal who becomes the clownishly homicidal Joker.","Language":"English, French, Spanish","Country":"USA, UK","Awards":"Won 1 Oscar. Another 8 wins & 26 nominations.","Poster":"https://m.media-amazon.com/images/M/MV5BMTYwNjAyODIyMF5BMl5BanBnXkFtZTYwNDMwMDk2._V1_SX300.jpg","Ratings":[{"Source":"Internet Movie Database","Value":"7.5/10"},{"Source":"Rotten Tomatoes","Value":"71%"},{"Source":"Metacritic","Value":"69/100"}],"Metascore":"69","imdbRating":"7.5","imdbVotes":"333,582","imdbID":"tt0096895","Type":"movie","DVD":"N/A","BoxOffice":"N/A","Production":"Warner Brothers, Guber-Peters Company, PolyGram Filmed Entertainment","Website":"N/A","Response":"True"}
    var movieDataById = 'tt2294629';

    // mocks module data 
    beforeEach(angular.mock.module('omdb'));

    // creates instance of the module data
    beforeEach(angular.mock.inject((_omdbApi_, _$httpBackend_) => {
        omdbApi = _omdbApi_;
        $httpBackend = _$httpBackend_;
    }));

    it('should return batman data', () => {
        var response = {};
        // var expectedURL = (url) => {
        //     return url.indexOf('http://www.omdbapi.com/?v=1&s=batman') !== -1;
        // };
        var expectedURL = 'http://www.omdbapi.com/?v=1&s=batman';

        $httpBackend.expect('GET', expectedURL)
            .respond(200, movieData);

        omdbApi.search('batman')
            .then((data) => {
                response = data;
            });

        $httpBackend.flush();
        expect(response).toEqual(movieData);
    });

    // it('should return data by id', () => {
    //     expect(omdbApi.search('batman')).toEqual(movieData);
    // });
});