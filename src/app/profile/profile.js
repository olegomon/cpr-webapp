angular.module('cpr.profile', [
    'cpr.profile.services',
    'cpr.profile.controllers'
])

    .config(function ($stateProvider) {
        $stateProvider
            .state('profile', {
                url        : '/profile',
                templateUrl: 'profile/profile.tpl.html',
                controller : 'ProfileCtrl'
            })
        ;
    })

;
