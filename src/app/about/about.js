angular.module('cpr.about', [
    'cpr.about.controllers',

    'ui.router'
])
    .config(function ($stateProvider) {
        $stateProvider
            .state('about', {
                url        : '/about',
                templateUrl: 'about/about.tpl.html'
            })
        ;
    })

;
