angular.module('cpr.game.filters', [
    'cpr.engine.constants'
])

    .filter('winner', function() {
        return function(winner) {
            if(winner === 'DRAW') {
                return 'Draw';
            } else {
                return winner + ' wins!';
            }
        };
    })

    .filter('gestureIcon', function(gestureFilter) {
        return function(input) {
            if(gestureFilter(input)) {
                return 'assets/images/' + gestureFilter(input).toLowerCase() + '.svg';
            } else {
                return '';
            }
        };
    })

    .filter('gesture', function () {

        return function (gesture) {
            if (gesture === 0) {
                return 'Rock';
            } else if (gesture === 1) {
                return 'Paper';
            } else if (gesture === 2) {
                return 'Scissors';
            } else if (gesture === 3) {
                return 'Lizard';
            } else if (gesture === 4) {
                return 'Spock';
            }
            return '';
        };
    })

;
