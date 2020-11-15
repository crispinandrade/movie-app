describe('Search Controller', () => {
    beforeEach(module('movieApp'));

    var $controller;
    var $scope;
    var $location;

    beforeEach(inject((_$controller_, _$rootScope_, _$location_) => {
        $controller = _$controller_;
        $scope = _$rootScope_.$new();
        $location = _$location_;

        var controller = $controller('SearchController', { $scope: $scope, $location: $location});
    }));

    it('should redirect to results page', () => {
        $scope.query = 'batman';
        $scope.search();
        
        expect($location.url()).toBe('/results?q=batman');
    });

    it('should not redirect on empty query', () => {
        $scope.query = '';
        $scope.search();
        
        expect($location.url()).toBe('');
    });
});