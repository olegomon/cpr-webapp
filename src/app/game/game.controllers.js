angular.module('cpr.game.controllers', [
    'cpr.engine.services'
])

    .controller('GameCtrl', function ($scope, $log, RulesService) {

        $scope.state = null;

        $scope.player1 = {
            name   : "Player1",
            gesture: null,
            ready  : false
        };

        $scope.player2 = {
            name   : 'Player2',
            gesture: null,
            ready  : false
        };

        $scope.score = {
            home: 0,
            away: 0
        };

        $scope.play = function () {
            $scope.player1.gesture = null;
            $scope.player2.gesture = null;
            $scope.state = 'play';
        };

        $scope.reveal = function () {
            $scope.state = 'reveal';
        };

        $scope.isPlaying = function () {
            return $scope.state === 'play';
        };

        function updateScore() {
            var payoff = RulesService.getPayoff($scope.player1.gesture, $scope.player2.gesture);
            if (payoff.player1) {
                $scope.score.home += 1;
            }
            if (payoff.player2) {
                $scope.score.away += 1;
            }
        }

        $scope.isReady = function (player) {
            return RulesService.isValidGesture(player.gesture);
        };

        function onReady() {
            if ($scope.isReady($scope.player1) && $scope.isReady($scope.player2) && $scope.isPlaying()) {
                updateScore();
                $scope.reveal();
            }
        }

        $scope.$watch('player1.gesture', onReady);
        $scope.$watch('player2.gesture', onReady);
    })
;
