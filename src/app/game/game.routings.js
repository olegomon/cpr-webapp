angular.module('cpr.game.routings', [
    'ui.router'
])
    .config(function ($stateProvider) {
        $stateProvider
            .state('game', {
                url        : '/game',
                templateUrl: 'game/game.tpl.html',
                controller: 'GameCtrl',
                resolve: {
                    user: function(UserService, PlayerFactory) {
                        return UserService.loadUser().then(function(user) {
                            return PlayerFactory.createHumanPlayer(user);
                        });
                    }
                }
            })
        ;
    })

    .config(function ($stateProvider) {
        $stateProvider
            .state('demo', {
                url        : '/demo',
                templateUrl: 'game/game.tpl.html',
                controller: 'GameCtrl',
                resolve: {
                    user: function(PlayerFactory) {
                        return PlayerFactory.createComputerPlayer({});
                    }
                }
            })
        ;
    })

;
