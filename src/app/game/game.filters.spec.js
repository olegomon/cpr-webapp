describe('Game Filters', function () {

    beforeEach(module('cpr.game.filters'));


    describe('gesture filter', function () {

        it('should return correct name for a gesture number', inject(function (gestureFilter, GestureType) {
            expect(gestureFilter(GestureType.SCISSORS)).toEqual('Scissors');
            expect(gestureFilter(GestureType.ROCK)).toEqual('Rock');
            expect(gestureFilter(GestureType.PAPER)).toEqual('Paper');
            expect(gestureFilter(GestureType.LIZARD)).toEqual('Lizard');
            expect(gestureFilter(GestureType.SPOCK)).toEqual('Spock');
        }));

        it('should return empty string for a invalid gesture', inject(function (gestureFilter) {
            expect(gestureFilter(-1)).toEqual('');
        }));
    });

    describe('gesture icon filter', function () {

        it('should return correct file name for a gesture', inject(function (gestureIconFilter, GestureType) {
            expect(gestureIconFilter(GestureType.SCISSORS)).toEqual('assets/images/scissors.svg');
            expect(gestureIconFilter(GestureType.ROCK)).toEqual('assets/images/rock.svg');
            expect(gestureIconFilter(GestureType.PAPER)).toEqual('assets/images/paper.svg');
            expect(gestureIconFilter(GestureType.LIZARD)).toEqual('assets/images/lizard.svg');
            expect(gestureIconFilter(GestureType.SPOCK)).toEqual('assets/images/spock.svg');
        }));

        it('should return empty string if gesture is not valid', inject(function (gestureIconFilter) {
            expect(gestureIconFilter(-1)).toEqual('');
        }));
    });

    describe('winner filter', function () {

        it('should return winning message with the player name', inject(function (winnerFilter) {
            expect(winnerFilter('foo')).toEqual('foo wins!');
        }));

        it('should return "Draw" message if the result is DRAW', inject(function (winnerFilter) {
            expect(winnerFilter('DRAW')).toEqual('Draw');
        }));
    });
});