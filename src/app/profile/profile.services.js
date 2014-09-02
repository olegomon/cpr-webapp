angular.module('cpr.profile.services', [
])
    .factory('UserStorage', function($window) {
        return $window.localStorage;
    })

    .factory('UserService', function($q, UserStorage) {

        var key = 'user';

        return {

            /**
             * Load user from user storage
             *
             * @returns {Object} user
             */
            loadUser: function () {
                var dfd = $q.defer();
                var user = UserStorage.getItem(key);
                dfd.resolve(JSON.parse(user));
                return dfd.promise;
            },

            /**
             * Saves user to user storage
             *
             * @param {Object} user
             * @returns {Promise}
             */
            saveUser: function (user) {
                var dfd = $q.defer();
                UserStorage.setItem(key, JSON.stringify(user));
                dfd.resolve(user);
                return dfd.promise;
            }
        };
    })

;
