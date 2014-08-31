angular.module('cpr.game.controllers', [
    'cpr.engine.services'
])

    .controller('GameCtrl', function ($scope) {

        $scope.player1 = {
            name   : "Player1",
            gesture: "",
            reveal : false,
            ready  : false
        };

        $scope.player2 = {
            name   : 'Player2',
            gesture: "",
            reveal : false,
            ready  : false
        };

        $scope.score = {
            home: 0,
            away: 0
        };
    })
;
