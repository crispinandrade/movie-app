describe('Search Controller', () => {
    beforeEach(module('movieApp'));

    var $controller;
    var $scope;
    var $location;
    var $timeout;

    beforeEach(inject((_$controller_, _$rootScope_, _$location_, _$timeout_) => {
        $controller = _$controller_;
        $scope = _$rootScope_.$new();
        $location = _$location_;
        $timeout = _$timeout_;

        $controller('SearchController', { $scope: $scope, $location: $location, $timeout: $timeout});
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

    it('should be redirected after 1 second of keyboard inactivity', () => {
        $scope.query = 'batman';
        $scope.keyup();
        $timeout.flush();

        expect($timeout.verifyNoPendingTasks).not.toThrow();
        expect($location.url()).toBe('/results?q=batman');
    });

    it('should cencel timeout on keydown', () => {
        $scope.query = 'batman';
        $scope.keyup();
        $scope.keydown();

        expect($timeout.verifyNoPendingTasks).not.toThrow();
    });

    it('should cencel timeout on search', () => {
        $scope.query = 'batman';
        $scope.keyup();
        $scope.search();

        expect($timeout.verifyNoPendingTasks).not.toThrow();
    });
});