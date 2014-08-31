describe('Game Filters', function () {

    beforeEach(module('cpr.game.filters'));


    describe('gesture filter', function () {

        it('should return correct name for a gesture number', inject(function (gestureFilter, GESTURES) {
            expect(gestureFilter(GESTURES.SCISSORS)).toEqual('Scissors');
            expect(gestureFilter(GESTURES.ROCK)).toEqual('Rock');
            expect(gestureFilter(GESTURES.PAPER)).toEqual('Paper');
            expect(gestureFilter(GESTURES.LIZARD)).toEqual('Lizard');
            expect(gestureFilter(GESTURES.SPOCK)).toEqual('Spock');
        }));

        it('should return empty string for a invalid gesture', inject(function (gestureFilter) {
            expect(gestureFilter(-1)).toEqual('');
        }));
    });

    describe('gesture icon filter', function () {

        it('should return correct file name for a gesture', inject(function (gestureIconFilter, GESTURES) {
            expect(gestureIconFilter(GESTURES.SCISSORS)).toEqual('scissors.svg');
            expect(gestureIconFilter(GESTURES.ROCK)).toEqual('rock.svg');
            expect(gestureIconFilter(GESTURES.PAPER)).toEqual('paper.svg');
            expect(gestureIconFilter(GESTURES.LIZARD)).toEqual('lizard.svg');
            expect(gestureIconFilter(GESTURES.SPOCK)).toEqual('spock.svg');
        }));
    });
});