angular.module('cpr.game', [
    'ui.router',
    'cpr.engine',
    'cpr.profile',

    'cpr.game.filters',
    'cpr.game.services',
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
                    user: function(UserService) {
                        return UserService.loadUser().then(function(user) {
                            return user || {};
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
                templateUrl: 'game/demo.tpl.html',
                controller: 'GameCtrl',
                resolve: {
                    user: function() {
                        return {};
                    }
                }
            })
        ;
    })

;
