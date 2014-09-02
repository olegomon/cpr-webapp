describe('Scissors, Paper, Rock, Lizard, Spock', function () {

    beforeEach(module('cpr.engine'));

    describe('game engine', function () {

        var RulesService;
        var GestureType;

        var draw = { draw: true, player1: false, player2: false };
        var player1 = { draw: false, player1: true, player2: false };
        var player2 = { draw: false, player1: false, player2: true };

        beforeEach(inject(function (_RulesService_, _GestureType_) {
            RulesService = _RulesService_;
            GestureType = _GestureType_;
        }));


        it('getGestures should return an array of gestures', function () {
            expect(RulesService.getGestures().length).toEqual(5);
            expect(RulesService.getGestures()).toEqual([0, 1, 2, 3, 4]);
        });

        it('getPayoff should return "DRAW" if both players picked the same gesture', function () {
            expect(RulesService.getPayoff(GestureType.SCISSORS, GestureType.SCISSORS)).toEqual(draw);
            expect(RulesService.getPayoff(GestureType.PAPER, GestureType.PAPER)).toEqual(draw);
            expect(RulesService.getPayoff(GestureType.ROCK, GestureType.ROCK)).toEqual(draw);
            expect(RulesService.getPayoff(GestureType.LIZARD, GestureType.LIZARD)).toEqual(draw);
            expect(RulesService.getPayoff(GestureType.SPOCK, GestureType.SPOCK)).toEqual(draw);
        });

        it('SCISSORS should beat PAPER', function () {
            expect(RulesService.getPayoff(GestureType.SCISSORS, GestureType.PAPER)).toEqual(player1);
            expect(RulesService.getPayoff(GestureType.PAPER, GestureType.SCISSORS)).toEqual(player2);
        });

        it('SCISSORS should beat LIZARD', function () {
            expect(RulesService.getPayoff(GestureType.SCISSORS, GestureType.LIZARD)).toEqual(player1);
            expect(RulesService.getPayoff(GestureType.LIZARD, GestureType.SCISSORS)).toEqual(player2);
        });

        it('PAPER should beat ROCK', function () {
            expect(RulesService.getPayoff(GestureType.PAPER, GestureType.ROCK)).toEqual(player1);
            expect(RulesService.getPayoff(GestureType.ROCK, GestureType.PAPER)).toEqual(player2);
        });

        it('PAPER should beat SPOCK', function () {
            expect(RulesService.getPayoff(GestureType.PAPER, GestureType.SPOCK)).toEqual(player1);
            expect(RulesService.getPayoff(GestureType.SPOCK, GestureType.PAPER)).toEqual(player2);
        });

        it('ROCK should beat SCISSORS', function () {
            expect(RulesService.getPayoff(GestureType.ROCK, GestureType.SCISSORS)).toEqual(player1);
            expect(RulesService.getPayoff(GestureType.SCISSORS, GestureType.ROCK)).toEqual(player2);
        });

        it('ROCK should beat LIZARD', function () {
            expect(RulesService.getPayoff(GestureType.ROCK, GestureType.LIZARD)).toEqual(player1);
            expect(RulesService.getPayoff(GestureType.LIZARD, GestureType.ROCK)).toEqual(player2);
        });

        it('LIZARD should beat PAPER', function () {
            expect(RulesService.getPayoff(GestureType.LIZARD, GestureType.PAPER)).toEqual(player1);
            expect(RulesService.getPayoff(GestureType.PAPER, GestureType.LIZARD)).toEqual(player2);
        });

        it('LIZARD should beat SPOCK', function () {
            expect(RulesService.getPayoff(GestureType.LIZARD, GestureType.SPOCK)).toEqual(player1);
            expect(RulesService.getPayoff(GestureType.SPOCK, GestureType.LIZARD)).toEqual(player2);
        });

        it('SPOCK should beat ROCK', function () {
            expect(RulesService.getPayoff(GestureType.SPOCK, GestureType.ROCK)).toEqual(player1);
            expect(RulesService.getPayoff(GestureType.ROCK, GestureType.SPOCK)).toEqual(player2);
        });

        it('SPOCK should beat ROCK', function () {
            expect(RulesService.getPayoff(GestureType.SPOCK, GestureType.SCISSORS)).toEqual(player1);
            expect(RulesService.getPayoff(GestureType.SCISSORS, GestureType.SPOCK)).toEqual(player2);
        });

        it('isValidGesture should return true if passed gesture is valid', function () {
            expect(RulesService.isValidGesture(0));
            expect(RulesService.isValidGesture(1));
            expect(RulesService.isValidGesture(2));
            expect(RulesService.isValidGesture(3));
            expect(RulesService.isValidGesture(4));
            expect(RulesService.isValidGesture(5));
        });

        it('should throw an exception if passed gesture is not valid', function () {

            expect(function () {
                RulesService.getPayoff(-1, GestureType.SPOCK);
            }).toThrow();

            expect(function () {
                RulesService.getPayoff(5, GestureType.SPOCK);
            }).toThrow();

            expect(function () {
                RulesService.getPayoff(GestureType.SPOCK, -1);
            }).toThrow();

            expect(function () {
                RulesService.getPayoff(GestureType.SPOCK, 5);
            }).toThrow();

            expect(function () {
                RulesService.getPayoff("", GestureType.SPOCK);
            }).toThrow();

            expect(function () {
                RulesService.getPayoff(GestureType.SPOCK, "");
            }).toThrow();
        });
    });
});