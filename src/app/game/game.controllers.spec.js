describe('Game Controllers', function () {

    beforeEach(module('cpr.game', 'cpr.engine'));

    var $scope;

    describe('GameCtrl', function () {

        var GESTURES;

        beforeEach(inject(function($controller, $rootScope, _GESTURES_) {
            $scope = $rootScope.$new();
            $controller('GameCtrl', {$scope: $scope, user: {} });
            GESTURES = _GESTURES_;
        }));

        it('should init score on the scope', function() {
            expect($scope.score).toBeTruthy();
            expect($scope.score.home).toBe(0);
            expect($scope.score.away).toBe(0);
        });

        it('should init player1 on the scope', function() {
            expect($scope.player1).toBeTruthy();
            expect($scope.player1.name).toBeTruthy();
            expect($scope.player1.gesture).toBe(null);
        });

        it('should init player2 on the scope', function() {
            expect($scope.player2).toBeTruthy();
            expect($scope.player2.name).toBeTruthy();
            expect($scope.player2.gesture).toBe(null);
        });

        it('should init state on the scope', function() {
            expect($scope.state).toBe(null);
        });

        it('play() should reset the gestures and set the state to "play"', function() {

            $scope.player1.gesture = GESTURES.ROCK;
            $scope.player2.gesture = GESTURES.ROCK;
            $scope.state = 'reveal';

            $scope.play();

            expect($scope.state).toBe('play');
            expect($scope.player1.gesture).toBe(null);
            expect($scope.player2.gesture).toBe(null);
        });

        it('valid changes on gestures should update the state', function() {

            spyOn($scope, 'reveal').andCallThrough();
            spyOn($scope, 'isReady').andCallThrough();

            // start game
            $scope.play();

            // player one ready
            $scope.player1.gesture = GESTURES.ROCK;

            // digest to trigger watch listeners
            $scope.$apply();

            expect($scope.reveal).not.toHaveBeenCalled();
            expect($scope.isReady).toHaveBeenCalledWith($scope.player1);

            // player two ready
            $scope.player2.gesture = GESTURES.ROCK;

            $scope.$apply();

            expect($scope.isReady).toHaveBeenCalledWith($scope.player1);
            expect($scope.isReady).toHaveBeenCalledWith($scope.player2);
            expect($scope.reveal).toHaveBeenCalled();

            // both players show the results
            expect($scope.state).toEqual('reveal');
        });

        it('should update the score according to the gestures of the players', function() {

            expect($scope.score.home).toBe(0);
            expect($scope.score.away).toBe(0);

            // start game
            $scope.play();

            // player 1 must win
            $scope.player1.gesture = GESTURES.PAPER;
            $scope.player2.gesture = GESTURES.ROCK;


            // digest to trigger watch listeners
            $scope.$apply();

            expect($scope.score.home).toBe(1);
            expect($scope.score.away).toBe(0);
        });
    });

});
