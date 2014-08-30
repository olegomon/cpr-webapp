describe('Scissors, Paper, Rock, Lizard, Spock', function () {

    beforeEach(module('cpr.engine'));

    describe('game engine', function () {

        var RulesService;
        var GESTURES;

        var draw =    { draw: true,  player1: false, player2: false };
        var player1 = { draw: false, player1: true,  player2: false };
        var player2 = { draw: false, player1: false, player2: true };

        beforeEach(inject(function (_RulesService_, _GESTURES_) {
            RulesService = _RulesService_;
            GESTURES = _GESTURES_;
        }));

        it('getPayoff should return "DRAW" if both players picked the same gesture', function () {
            expect(RulesService.getPayoff(GESTURES.SCISSORS, GESTURES.SCISSORS)).toEqual(draw);
            expect(RulesService.getPayoff(GESTURES.PAPER, GESTURES.PAPER)).toEqual(draw);
            expect(RulesService.getPayoff(GESTURES.ROCK, GESTURES.ROCK)).toEqual(draw);
            expect(RulesService.getPayoff(GESTURES.LIZARD, GESTURES.LIZARD)).toEqual(draw);
            expect(RulesService.getPayoff(GESTURES.SPOCK, GESTURES.SPOCK)).toEqual(draw);
        });

        it('SCISSORS should beat PAPER', function () {
            expect(RulesService.getPayoff(GESTURES.SCISSORS, GESTURES.PAPER)).toEqual(player1);
            expect(RulesService.getPayoff(GESTURES.PAPER, GESTURES.SCISSORS)).toEqual(player2);
        });

        it('SCISSORS should beat LIZARD', function () {
            expect(RulesService.getPayoff(GESTURES.SCISSORS, GESTURES.LIZARD)).toEqual(player1);
            expect(RulesService.getPayoff(GESTURES.LIZARD, GESTURES.SCISSORS)).toEqual(player2);
        });

        it('PAPER should beat ROCK', function () {
            expect(RulesService.getPayoff(GESTURES.PAPER, GESTURES.ROCK)).toEqual(player1);
            expect(RulesService.getPayoff(GESTURES.ROCK, GESTURES.PAPER)).toEqual(player2);
        });

        it('PAPER should beat SPOCK', function () {
            expect(RulesService.getPayoff(GESTURES.PAPER, GESTURES.SPOCK)).toEqual(player1);
            expect(RulesService.getPayoff(GESTURES.SPOCK, GESTURES.PAPER)).toEqual(player2);
        });

        it('ROCK should beat SCISSORS', function () {
            expect(RulesService.getPayoff(GESTURES.ROCK, GESTURES.SCISSORS)).toEqual(player1);
            expect(RulesService.getPayoff(GESTURES.SCISSORS, GESTURES.ROCK)).toEqual(player2);
        });

        it('ROCK should beat LIZARD', function () {
            expect(RulesService.getPayoff(GESTURES.ROCK, GESTURES.LIZARD)).toEqual(player1);
            expect(RulesService.getPayoff(GESTURES.LIZARD, GESTURES.ROCK)).toEqual(player2);
        });

        it('LIZARD should beat PAPER', function () {
            expect(RulesService.getPayoff(GESTURES.LIZARD, GESTURES.PAPER)).toEqual(player1);
            expect(RulesService.getPayoff(GESTURES.PAPER, GESTURES.LIZARD)).toEqual(player2);
        });

        it('LIZARD should beat SPOCK', function () {
            expect(RulesService.getPayoff(GESTURES.LIZARD, GESTURES.SPOCK)).toEqual(player1);
            expect(RulesService.getPayoff(GESTURES.SPOCK, GESTURES.LIZARD)).toEqual(player2);
        });

        it('SPOCK should beat ROCK', function () {
            expect(RulesService.getPayoff(GESTURES.SPOCK, GESTURES.ROCK)).toEqual(player1);
            expect(RulesService.getPayoff(GESTURES.ROCK, GESTURES.SPOCK)).toEqual(player2);
        });

        it('SPOCK should beat ROCK', function () {
            expect(RulesService.getPayoff(GESTURES.SPOCK, GESTURES.SCISSORS)).toEqual(player1);
            expect(RulesService.getPayoff(GESTURES.SCISSORS, GESTURES.SPOCK)).toEqual(player2);
        });

        it('should throw an exception if passed gesture is not valid', function () {

            expect(function() {
                RulesService.getPayoff(-1, GESTURES.SPOCK);
            }).toThrow();

            expect(function() {
                RulesService.getPayoff(5, GESTURES.SPOCK);
            }).toThrow();

            expect(function() {
                RulesService.getPayoff(GESTURES.SPOCK, -1);
            }).toThrow();

            expect(function() {
                RulesService.getPayoff(GESTURES.SPOCK, 5);
            }).toThrow();

            expect(function() {
                RulesService.getPayoff("", GESTURES.SPOCK);
            }).toThrow();

            expect(function() {
                RulesService.getPayoff(GESTURES.SPOCK, "");
            }).toThrow();
        });
    });
});