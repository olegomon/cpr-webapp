describe('Game Controllers', function () {

    beforeEach(module('cpr.game'));

    var $scope;

    describe('GameCtrl', function () {

        beforeEach(inject(function($controller, $rootScope) {
            $scope = $rootScope.$new();
            $controller('GameCtrl', {$scope: $scope, user: {} });
        }));

        it('should init score on the scope', function() {
            expect($scope.score).toBeTruthy();
            expect($scope.score.home).toBe(0);
            expect($scope.score.away).toBe(0);
        });

        it('should init player1 on the scope', function() {
            expect($scope.player1).toBeTruthy();
            expect($scope.player1.name).toBeTruthy();
            expect($scope.player1.gesture).toBe("");
            expect($scope.player1.reveal).toBe(false);
            expect($scope.player1.ready).toBe(false);
        });

        it('should init player2 on the scope', function() {
            expect($scope.player2).toBeTruthy();
            expect($scope.player2.name).toBeTruthy();
            expect($scope.player2.gesture).toBe("");
            expect($scope.player2.reveal).toBe(false);
            expect($scope.player2.ready).toBe(false);
        });

    });

});
