describe('Navigation Controllers', function () {

    beforeEach(module('cpr.navigation'));

    var $scope;

    describe('NavCtrl', function () {

        beforeEach(inject(function($controller, $rootScope) {
            $scope = $rootScope.$new();
            $controller('NavCtrl', {$scope: $scope});
        }));

        it('should set the title on the scope', function() {
            expect($scope.title).toEqual('Scissors Paper Rock Lizard Spock');
        });

        it('toggleNavbar should change the navbar collapse state', function() {

            // initial state
            expect($scope.navbarCollapsed).toBe(true);

            $scope.toggleNavbar();
            expect($scope.navbarCollapsed).toBe(false);
            $scope.toggleNavbar();
            expect($scope.navbarCollapsed).toBe(true);
        });

        it('closeNavbar should set to collapsed state to true', function() {

            // initial state
            expect($scope.navbarCollapsed).toBe(true);

            $scope.toggleNavbar();
            expect($scope.navbarCollapsed).toBe(false);
            $scope.closeNavbar();
            expect($scope.navbarCollapsed).toBe(true);
        });

    });

});