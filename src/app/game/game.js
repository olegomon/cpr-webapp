angular.module('cpr.game', [
    'ui.router',
    'cpr.engine',
    'cpr.profile',

    'cpr.game.services',
    'cpr.game.controllers'
])
    .config(function ($stateProvider) {
        $stateProvider
            .state('game', {
                url        : '/game',
                templateUrl: 'game/game.tpl.html',
                controller: 'GameCtrl',
                resolve: {
                    user: function(UserService) {
                        return UserService.loadUser();
                    }
                }
            })
        ;
    })

;
