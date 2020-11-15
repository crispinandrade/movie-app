describe('Movie Result Directive', () => {
    var result = {
        Poster: 'http://localhost/image.jpg',
        Title: 'Batman',
        Director: 'guy',
        Actors: '1, 2, 3 ,4',
        Released: '12 May 2012',
        Genre: 'Action, Adventure'
    };

    it('should output movie result to expected HTML format', () => {
        var html;
        expect(html).toBe('<div>Banman</div>');
    });
});