angular.module('cpr.navigation.controllers', [
])
    .controller('NavCtrl', function($scope) {
        $scope.title = 'SPR - Lizard Spock';

        $scope.navbarCollapsed = true;

        $scope.toggleNavbar = function() {
            $scope.navbarCollapsed = !$scope.navbarCollapsed;
        };

        $scope.closeNavbar = function() {
            $scope.navbarCollapsed = true;
        };

        $scope.menuItems = [
            { state: 'profile', name: 'Profile' },
            { state: 'game', name: 'Play' },
            { state: 'demo', name: 'Demo' },
            { state: 'about', name: 'About' }
        ];
    })
;