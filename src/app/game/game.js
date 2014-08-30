angular.module('cpr.game', [
    'cpr.game.services',
    'cpr.game.controllers',

    'ui.router'
])

    .config(function ($stateProvider) {
        $stateProvider
            .state('game', {
                url        : '/game',
                templateUrl: 'game/game.tpl.html'
            })
        ;
    })

;
