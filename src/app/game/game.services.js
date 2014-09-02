angular.module('cpr.game.services', [
])
    .factory('PlayerFactory', function(PlayerType) {

        function createPlayer(player, type, altName) {
            var result = player;
            result.type = type;
            result.name = player.name || altName;
            return result;
        }


        return {

            /**
             * Creates a "HUMAN" player, if null is passed a default name will be used
             *
             * @param user
             * @returns {*}
             */
            createHumanPlayer: function (user) {
                return createPlayer(user || {}, PlayerType.HUMAN, 'Player');
            },

            /**
             * Creates a "COMPUTER" player, if null is passed a default name will be used
             *
             * @param user
             * @returns {*}
             */
            createComputerPlayer: function (user) {
                return createPlayer(user || {}, PlayerType.COMPUTER, 'Computer');
            }
        };
    })


;
