angular.module('cpr.game', [
    'ui.router',
    'cpr.engine',
    'cpr.profile',

    'cpr.game.filters',
    'cpr.game.services',
    'cpr.game.constants',
    'cpr.game.controllers',
    'cpr.game.directives'
])
    .config(function ($stateProvider) {
        $stateProvider
            .state('game', {
                url        : '/game',
                templateUrl: 'game/game.tpl.html',
                controller: 'GameCtrl',
                resolve: {
                    user: function(UserService, PlayerType) {
                        return UserService.loadUser().then(function(user) {
                            user = user || {};
                            user.type = PlayerType.HUMAN;
                            return user;
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
                    user: function(PlayerType) {
                        var user = {};
                        user.type = PlayerType.COMPUTER;
                        return user;
                    }
                }
            })
        ;
    })

;
