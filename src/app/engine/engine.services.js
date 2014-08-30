angular.module('cpr.engine.services', [
])
    .factory('RulesService', function() {

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

        function getPayoff(p1, p2) {
            return RULES[p1][p2];
        }


        return {

            /**
             * Return a result for a giving gesture combination
             *
             * @param {Number} gesture1
             * @param {Number} gesture2
             * @returns {Object} result
             */
            getPayoff: function (gesture1, gesture2) {

                if(!angular.isNumber(gesture1)) {
                    throw new TypeError('gesture1 parameter must be a number');
                }

                if(!angular.isNumber(gesture2)) {
                    throw new TypeError('gesture2 parameter must be a number');
                }

                if (gesture1 < 0 || gesture1 >= RULES.length) {
                    throw new Error('Unknown gesture');
                }

                if (gesture2 < 0 || gesture2 >= RULES.length) {
                    throw new Error('Unknown gesture');
                }

                var result = {};
                var payoff = getPayoff(gesture1, gesture2);
                result.draw = gesture1 === gesture2;
                result.player1 = payoff.r > 0;
                result.player2 = payoff.c > 0;
                return result;
            }
        };

    })

;
