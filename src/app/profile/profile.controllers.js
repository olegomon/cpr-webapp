angular.module('cpr.profile.controllers', [
    'ui.router'
])
    .controller('ProfileCtrl', function($scope, $state) {
        $scope.user = {
            name: "",
            email: ""
        };

        $scope.save = function() {
            $scope.$broadcast('show-errors-check-validity');
            if ($scope.userForm.$valid) {
                $state.go('game');
            }
        };
    })
;


