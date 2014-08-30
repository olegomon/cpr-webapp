angular.module('cpr.profile.services', [
])
    .factory('UserStorage', function($window) {
        return $window.localStorage;
    })

    .factory('UserService', function($q, UserStorage) {

        var key = 'user';

        return {

            loadUser: function () {
                var dfd = $q.defer();
                var user = UserStorage.getItem(key);
                dfd.resolve(JSON.parse(user));
                return dfd.promise;
            },

            saveUser: function (user) {
                var dfd = $q.defer();
                UserStorage.setItem(key, JSON.stringify(user));
                dfd.resolve(user);
                return dfd.promise;
            }
        };
    })

;
