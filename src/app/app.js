angular.module('cpr', [

    'ui.bootstrap',
    'ui.bootstrap.showErrors',
    'ui.route',
    'ui.router',

    'app.templates',
    'cpr.navigation',
    'cpr.profile',
    'cpr.engine',
    'cpr.game',
    'cpr.about'
])

    .config(function ($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/about');
    })

;