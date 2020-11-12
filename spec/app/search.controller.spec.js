describe('Search Controller', () => {
    var $scope;
    var $location;
    var $controller;

    beforeEach(module('movieApp'));

    beforeEach(inject((_$scope_, _$controller_, _$location_) => {
        $scope = _$scope_;
        $controller = _$controller_;
        $location = _$location_;
    }));

    it('should redirect to results page', () => {
        // $scope = $controller('SearchController', { $location: $location }, { query: 'batman' });
        $scope.query = 'batman';
        $scope.search();
        expect($location.url()).toBe('/results?q=batman');
    });

    it('should not redirect on empty query', () => {
        // $scope = $controller('SearchController', { $location: $location }, { query: '' });
        $scope.query = '';
        $scope.search();
        expect($location.url()).toBe('');
    });
});