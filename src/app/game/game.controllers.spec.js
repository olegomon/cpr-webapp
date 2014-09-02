describe('Game Controllers', function () {

    beforeEach(module('cpr.game', 'cpr.engine'));

    var $scope;

    describe('GameCtrl', function () {

        var GestureType;
        var PlayerType;

        beforeEach(inject(function($controller, $rootScope, _GestureType_, _PlayerType_) {
            $scope = $rootScope.$new();

            GestureType = _GestureType_;
            PlayerType = _PlayerType_;

            $controller('GameCtrl', {$scope: $scope, user: {
                name: 'User Player',
                type: PlayerType.HUMAN
            }});

        }));

        it('should init score on the scope', function() {
            expect($scope.score).toBeTruthy();
            expect($scope.score.home).toBe(0);
            expect($scope.score.away).toBe(0);
        });

        it('should init player1 on the scope', function() {
            expect($scope.player1).toBeTruthy();
            expect($scope.player1.name).toEqual('User Player');
            expect($scope.player1.type).toEqual(PlayerType.HUMAN);
            expect($scope.player1.gesture).toBe(null);
        });

        it('should init player2 on the scope', function() {
            expect($scope.player2).toBeTruthy();
            expect($scope.player2.name).toBeTruthy();
            expect($scope.player2.type).toEqual(PlayerType.COMPUTER);
            expect($scope.player2.gesture).toBe(null);
        });

        it('should init state on the scope', function() {
            expect($scope.state).toBe(null);
        });

        it('play() should reset the GestureType and set the state to "play"', function() {

            $scope.player1.gesture = GestureType.ROCK;
            $scope.player2.gesture = GestureType.ROCK;
            $scope.state = 'reveal';

            $scope.play();

            expect($scope.state).toBe('play');
            expect($scope.round.winner).toBe(null);
            expect($scope.player1.gesture).toBe(null);
            expect($scope.player2.gesture).toBe(null);
        });

        it('close() should reset the winner field', function() {
            $scope.round.winner = 'Player 1';
            $scope.close();
            expect($scope.round.winner).toBe(null);
        });

        it('valid changes on GestureType should update the state', function() {

            spyOn($scope, 'reveal').andCallThrough();
            spyOn($scope, 'isReady').andCallThrough();

            // start game
            $scope.play();

            // player one ready
            $scope.player1.gesture = GestureType.ROCK;

            // digest to trigger watch listeners
            $scope.$apply();

            expect($scope.reveal).not.toHaveBeenCalled();
            expect($scope.isReady).toHaveBeenCalledWith($scope.player1);

            // player two ready
            $scope.player2.gesture = GestureType.ROCK;

            $scope.$apply();

            expect($scope.isReady).toHaveBeenCalledWith($scope.player1);
            expect($scope.isReady).toHaveBeenCalledWith($scope.player2);
            expect($scope.reveal).toHaveBeenCalled();

            // both players show the results
            expect($scope.state).toEqual('reveal');
        });

        it('should update the score and winner according to the GestureType of the players', function() {

            expect($scope.score.home).toBe(0);
            expect($scope.score.away).toBe(0);

            // start game
            $scope.play();

            // player 1 must win
            $scope.player1.gesture = GestureType.PAPER;
            $scope.player2.gesture = GestureType.ROCK;


            // digest to trigger watch listeners
            $scope.$apply();

            expect($scope.round.winner).toEqual($scope.player1.name);
            expect($scope.score.home).toBe(1);
            expect($scope.score.away).toBe(0);

            // start game
            $scope.play();

            // player 2 must win
            $scope.player1.gesture = GestureType.ROCK;
            $scope.player2.gesture = GestureType.PAPER;

            $scope.$apply();

            expect($scope.round.winner).toEqual($scope.player2.name);
            expect($scope.score.home).toBe(1);
            expect($scope.score.away).toBe(1);

            // start game
            $scope.play();

            // DRAW
            $scope.player1.gesture = GestureType.ROCK;
            $scope.player2.gesture = GestureType.ROCK;

            $scope.$apply();

            expect($scope.round.winner).toEqual('DRAW');
            expect($scope.score.home).toBe(1);
            expect($scope.score.away).toBe(1);
        });
    });

});
