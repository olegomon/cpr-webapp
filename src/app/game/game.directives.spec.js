describe('Game Directives', function () {


    beforeEach(module('cpr', 'ngMock'));

    var $rootScope, $compile;

    beforeEach(inject(function (_$compile_, _$rootScope_) {
        $rootScope = _$rootScope_;
        $compile = _$compile_;
    }));

    describe('user gesture picker', function () {
        var $scope, element;

        beforeEach(inject(function () {
            $scope = $rootScope.$new();
            element = $compile('<user-gesture-picker player="player" state="state"></user-gesture-picker>')($scope);
            $rootScope.$apply();
        }));

        it('should set gestures on the scope', inject(function (RulesService) {
            var scope = element.isolateScope();
            expect(scope.gestures).toEqual(RulesService.getGestures());
        }));

        it('pick() should set the gesture on the scope', inject(function (GestureType) {
            var scope = element.isolateScope();
            scope.pick(GestureType.ROCK);
            expect(scope.gesture).toEqual(GestureType.ROCK);
        }));

    });

    describe('auto gesture picker', function () {
        var $scope, element, $interval, RulesService;

        beforeEach(inject(function (_$interval_, _RulesService_) {
            RulesService = _RulesService_;
            $interval = _$interval_;
            $scope = $rootScope.$new();
            $scope.state = '';
            $scope.gesture = '';
            element = $compile('<auto-gesture-picker gesture="gesture" state="state"></auto-gesture-picker>')($scope);
            $rootScope.$apply();
        }));

        it('should set gestures on the scope', inject(function (RulesService) {
            var scope = element.isolateScope();
            expect(scope.gestures).toEqual(RulesService.getGestures());
        }));

        it('should set mask on the scope', function () {
            var scope = element.isolateScope();
            expect(scope.mask).toEqual('');
        });

        it('should set the gesture and mask when the state changes to "play" after a certain timeout', function () {

            var isolateScope, gestures, hasMask, hasGesture;

            isolateScope = element.isolateScope();
            gestures = RulesService.getGestures();

            // initial state
            expect($scope.state).toEqual('');
            expect($scope.gesture).toEqual('');
            expect(isolateScope.mask).toEqual('');

            $scope.state = 'play';

            $scope.$digest();
            $scope.$apply();


            // fire mask timeout
            $interval.flush(200);
            hasMask = gestures.indexOf(isolateScope.mask) > -1;
            expect(hasMask);

            // fire pick timeout
            $interval.flush(3000);
            hasGesture = gestures.indexOf($scope.gesture) > -1;
            expect(hasGesture);
        });

        it('should set the mask to gesture value when the state changes to reveal', function () {

            var hasGesture, gestures, isolateScope;

            isolateScope = element.isolateScope();
            gestures = RulesService.getGestures();

            // initial state
            expect($scope.state).toEqual('');
            expect($scope.gesture).toEqual('');

            $scope.state = 'reveal';
            $scope.$apply();

            hasGesture = gestures.indexOf($scope.gesture) > -1;
            expect(hasGesture);

            expect(isolateScope.mask).toEqual($scope.gesture);
        });
    });

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
            var picker;

            $scope = $rootScope.$new();
            $scope.player = { type: PlayerType.HUMAN };
            element = $compile('<gesture-picker player="player"></gesture-picker>')($scope);
            $rootScope.$apply();
            picker = element.find('user-gesture-picker');
            expect(picker.length).toEqual(1);
            expect(picker[0].tagName).toEqual('USER-GESTURE-PICKER');


            picker = element.find('auto-gesture-picker');
            expect(picker.length).toEqual(0);
        });

        it('should create a auto gesture picker directive for a computer player', function () {
            var picker;
            $scope = $rootScope.$new();
            $scope.player = { type: PlayerType.COMPUTER };
            element = $compile('<gesture-picker player="player"></gesture-picker>')($scope);
            $rootScope.$apply();
            picker = element.find('auto-gesture-picker');
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