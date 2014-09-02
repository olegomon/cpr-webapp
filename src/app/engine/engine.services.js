angular.module('cpr.engine.services', [
])
    .factory('RulesService', function(GestureType) {

        /**
         * The normal form matrix of rock-paper-scissors-lizard-Spock.
         * Rows represent available choices for player 1, columns those for player 2.
         * Numbers in cells show utility (payoff) for player 1, player 2.
         * @type {*[]}
         */
        var RULES = [
            [ { r:  0, c:  0 }, { r: -1, c:  1 }, { r:  1, c: -1 }, { r:  1, c: -1 }, { r: -1, c:  1 } ],
            [ { r:  1, c: -1 }, { r:  0, c:  0 }, { r: -1, c:  1 }, { r: -1, c:  1 }, { r:  1, c: -1 } ],
            [ { r: -1, c:  1 }, { r:  1, c: -1 }, { r:  0, c:  0 }, { r:  1, c: -1 }, { r: -1, c:  1 } ],
            [ { r: -1, c:  1 }, { r:  1, c: -1 }, { r: -1, c:  1 }, { r:  0, c:  0 }, { r:  1, c: -1 } ],
            [ { r:  1, c: -1 }, { r: -1, c:  1 }, { r:  1, c: -1 }, { r: -1, c:  1 }, { r:  0, c:  0 } ],
        ];

        function getRule(p1, p2) {
            return RULES[p1][p2];
        }

        function isValidGesture(gesture) {
            if (angular.isNumber(gesture)) {
                return gesture > -1 && gesture < RULES.length;
            } else {
                return false;
            }
        }

        function getPayoff(gesture1, gesture2) {

            if(!angular.isNumber(gesture1)) {
                throw new TypeError('gesture1 parameter must be a number');
            }

            if(!angular.isNumber(gesture2)) {
                throw new TypeError('gesture2 parameter must be a number');
            }

            if (!isValidGesture(gesture1) || !isValidGesture(gesture2)) {
                throw new Error('Unknown gesture');
            }

            var result = {};
            var payoff = getRule(gesture1, gesture2);
            result.draw = gesture1 === gesture2;
            result.player1 = payoff.r > 0;
            result.player2 = payoff.c > 0;
            return result;
        }

        function getGestures() {
            return Object.keys(GestureType).map(function (key) {
                return GestureType[key];
            });
        }

        return {
            /**
             * Returns a array of gesture numbers
             * @returns {Array}
             */
            getGestures: getGestures,

            /**
             * Returns true if passed gesture is a number and valid
             *
             * @param {*}
             * @returns {Boolean}
             */
            isValidGesture: isValidGesture,

            /**
             * Return a result for a giving gesture combination
             *
             * @param {Number} gesture1
             * @param {Number} gesture2
             * @returns {Object} result
             */
            getPayoff: getPayoff
        };

    })

;
