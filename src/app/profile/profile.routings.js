angular.module('cpr.profile.routings', [
    'ui.router'
])
    .config(function ($stateProvider) {
        $stateProvider
            .state('profile', {
                url        : '/profile',
                templateUrl: 'profile/profile.tpl.html',
                controller : 'ProfileCtrl',
                resolve: {
                    user: function(UserService) {
                        return UserService.loadUser();
                    }
                }
            })
        ;
    })
;
