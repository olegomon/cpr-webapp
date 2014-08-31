angular.module('cpr.game.filters', [
    'cpr.engine.constants'
])

    .filter('gestureIcon', function(gestureFilter) {
        return function(input) {
            return gestureFilter(input).toLowerCase() + '.svg';
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
