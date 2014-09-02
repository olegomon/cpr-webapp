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

            createHumanPlayer: function (user) {
                return createPlayer(user, PlayerType.HUMAN, 'Player');
            },

            createComputerPlayer: function (user) {
                return createPlayer(user, PlayerType.COMPUTER, 'Computer');
            }
        };
    })


;
