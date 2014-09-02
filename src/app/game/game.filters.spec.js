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
            expect(gestureIconFilter(GESTURES.SCISSORS)).toEqual('assets/images/scissors.svg');
            expect(gestureIconFilter(GESTURES.ROCK)).toEqual('assets/images/rock.svg');
            expect(gestureIconFilter(GESTURES.PAPER)).toEqual('assets/images/paper.svg');
            expect(gestureIconFilter(GESTURES.LIZARD)).toEqual('assets/images/lizard.svg');
            expect(gestureIconFilter(GESTURES.SPOCK)).toEqual('assets/images/spock.svg');
        }));

        it('should return empty string if gesture is not valid', inject(function (gestureIconFilter) {
            expect(gestureIconFilter(-1)).toEqual('');
        }));
    });

    describe('winner filter', function () {

        it('should return winning message with the player name', inject(function (winnerFilter) {
            expect(winnerFilter('foo')).toEqual('Winner: foo');
        }));

        it('should return "Draw" message if the result is DRAW', inject(function (winnerFilter) {
            expect(winnerFilter('DRAW')).toEqual('Draw');
        }));
    });
});