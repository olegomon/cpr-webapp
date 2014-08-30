angular.module('cpr.profile.controllers', [
    'ui.router'
])
    .controller('ProfileCtrl', function($scope, $state, UserService) {
        $scope.user = {
            name: "",
            email: ""
        };

        $scope.save = function() {
            $scope.$broadcast('show-errors-check-validity');
            if ($scope.userForm.$valid) {
                UserService.saveUser($scope.user).then(function() {
                    $state.go('game');
                });
                // TODO handle save error
            }
        };
    })
;


