describe('Game Directives', function () {


    beforeEach(module('cpr'));

    var $rootScope, $compile;

    beforeEach(inject(function (_$compile_, _$rootScope_) {
        $rootScope = _$rootScope_;
        $compile = _$compile_;
    }));

    describe('gesture picker directive', function () {

        var $scope, element, PlayerType;

        beforeEach(inject(function (_PlayerType_) {
            PlayerType = _PlayerType_;
            $scope = $rootScope.$new();

            $scope.player = { type: PlayerType.HUMAN };
            $scope.state = 'play';
            element = $compile('<gesture-picker player="player" state="state"></gesture-picker>')($scope);
            $rootScope.$apply();
        }));

        it('should create a user gesture picker directive for a user player', function () {
            $scope = $rootScope.$new();
            $scope.player = { type: PlayerType.HUMAN };
            element = $compile('<gesture-picker player="player"></gesture-picker>')($scope);
            $rootScope.$apply();
            var picker = element.find('user-gesture-picker');
            expect(picker.length).toEqual(1);
            expect(picker[0].tagName).toEqual('USER-GESTURE-PICKER');


            picker = element.find('auto-gesture-picker');
            expect(picker.length).toEqual(0);
        });

        it('should create a auto gesture picker directive for a computer player', function () {
            $scope = $rootScope.$new();
            $scope.player = { type: PlayerType.COMPUTER };
            element = $compile('<gesture-picker player="player"></gesture-picker>')($scope);
            $rootScope.$apply();
            var picker = element.find('auto-gesture-picker');
            expect(picker.length).toEqual(1);
            expect(picker[0].tagName).toEqual('AUTO-GESTURE-PICKER');

            picker = element.find('user-gesture-picker');
            expect(picker.length).toEqual(0);
        });

        it('isComputer() should return true if player type is COMPUTER', function() {
            var scope = element.isolateScope();
            expect(scope.isComputer({ type: PlayerType.COMPUTER })).toBe(true);
            expect(scope.isComputer({ type: PlayerType.HUMAN })).toBe(false);
        });

        it('isHuman() should return true if player type is HUMAN', function() {
            var scope = element.isolateScope();
            expect(scope.isHuman({ type: PlayerType.HUMAN })).toBe(true);
            expect(scope.isHuman({ type: PlayerType.COMPUTER })).toBe(false);
        });
    });

});