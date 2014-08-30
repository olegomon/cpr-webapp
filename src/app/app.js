angular.module('cpr', [
    'app.templates',
    'cpr.engine'
])

    .controller('AppCtrl', function($scope) {
        $scope.title = 'Scissors Paper Rock Lizard Spock';
    })
;