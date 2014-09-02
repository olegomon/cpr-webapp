describe('Profile Services', function () {

    beforeEach(module('cpr.profile'));




    describe('UserService', function () {
        var UserService, $scope, $window, UserStorage;

        var user = {
            name : 'user',
            email: 'user@mail.com'
        };

        beforeEach(module(function ($provide) {
            UserStorage = {};
            UserStorage.getItem = jasmine.createSpy().andReturn(JSON.stringify(user));
            UserStorage.setItem = jasmine.createSpy();
            $provide.value('UserStorage', UserStorage);
        }));

        beforeEach(inject(function ($rootScope, _$window_, _UserService_) {
            $scope = $rootScope.$new();
            UserService = _UserService_;
            $window = _$window_;
        }));

        afterEach(function () {
            $window.localStorage.setItem('user', null);
        });

        it('saveUser should persist the user to localStorage', function () {
            var result;
            UserService.saveUser(user).then(function (user) {
                result = user;
            });
            $scope.$apply();
            expect(UserStorage.setItem).toHaveBeenCalledWith('user', JSON.stringify(user));
            expect(result).toEqual(user);
        });

        it('loadUser should load the user from localStorage', function () {
            var result;

            UserService.loadUser().then(function (user) {
                result = user;
            });

            $scope.$apply();
            expect(UserStorage.getItem).toHaveBeenCalledWith('user');
            expect(result).toEqual(user);
        });
    });

});