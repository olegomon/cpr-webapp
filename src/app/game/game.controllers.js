angular.module('cpr.game.controllers', [
    'cpr.engine.services'
])

    .controller('GameCtrl', function ($scope, $log, RulesService, user) {

        $scope.state = null;
        $scope.round = {
            winner: null
        };

        $scope.player1 = {
            name   : user.name || 'Player1',
            gesture: null,
            ready  : false
        };

        $scope.player2 = {
            name   : 'Player2',
            gesture: null,
            ready  : false
        };

        $scope.close = function() {
            resetWinner();
        };

        $scope.score = {
            home: 0,
            away: 0
        };

        $scope.play = function () {
            resetGestures();
            resetWinner();
            $scope.state = 'play';
        };

        $scope.reveal = function () {
            $scope.state = 'reveal';
        };

        $scope.isPlaying = function () {
            return $scope.state === 'play';
        };


        function resetGestures() {
            $scope.player1.gesture = null;
            $scope.player2.gesture = null;
        }

        function resetWinner() {
            $scope.round.winner = null;
        }

        function updateRound(payoff) {
            if(payoff.player1) {
                $scope.round.winner = $scope.player1.name;
            }
            if(payoff.player2) {
                $scope.round.winner = $scope.player2.name;
            }
            if(payoff.draw) {
                $scope.round.winner = 'DRAW';
            }

        }

        function updateScore(payoff) {
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

                var payoff = RulesService.getPayoff($scope.player1.gesture, $scope.player2.gesture);
                updateScore(payoff);
                updateRound(payoff);
                $scope.reveal();
            }
        }

        $scope.$watch('player1.gesture', onReady);
        $scope.$watch('player2.gesture', onReady);
    })
;
