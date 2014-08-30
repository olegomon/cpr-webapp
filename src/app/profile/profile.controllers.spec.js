describe('Profile Controllers', function () {

    beforeEach(module('cpr.profile'));

    var $scope;

    describe('ProfileCtrl', function () {

        var $state;
        var $q;
        var saveUserDfd;

        beforeEach(module(function ($provide) {
            var UserServiceMock = {};
            UserServiceMock.saveUser = jasmine.createSpy().andCallFake(function () {
                saveUserDfd = $q.defer();
                return saveUserDfd.promise;
            });
            $provide.value('UserService', UserServiceMock);
        }));

        describe('saving a user', function () {
            beforeEach(inject(function($controller, $rootScope, _$state_, _$q_) {
                $scope = $rootScope.$new();
                $state = _$state_;
                $controller('ProfileCtrl', {$scope: $scope, user: null});
                $q = _$q_;
            }));

            // saving user profile
            it('should have a save method', function() {
                expect($scope.save).toBeTruthy();
            });

            it('save() should broadcast a validation trigger event', function() {
                $scope.userForm = {};
                $scope.userForm.$valid = false;
                spyOn($scope, '$broadcast');
                $scope.save();
                expect($scope.$broadcast).toHaveBeenCalledWith('show-errors-check-validity');
            });

            it('save() should navigate to game state if form is valid', function() {
                $scope.userForm = {};
                $scope.userForm.$valid = true;
                spyOn($state, 'go');
                $scope.save();

                // digest the deferred service invocation
                saveUserDfd.resolve();
                $scope.$apply();
                expect($state.go).toHaveBeenCalledWith('game');
            });

            it('save() must not navigate to game state if form is not valid', function() {
                $scope.userForm = {};
                $scope.userForm.$valid = false;
                spyOn($state, 'go');
                $scope.save();
                expect($state.go).not.toHaveBeenCalledWith('game');
            });
        });

        describe('init an existing user', function () {

            var user = {
                name: 'user',
                email: 'some@mail.com'
            };

            beforeEach(inject(function($controller) {
                $controller('ProfileCtrl', {$scope: $scope, user: user});
            }));

            it('should init empty name attribute if no user has been loaded', function() {
                expect($scope.user.name).toEqual('user');
            });

            it('should init empty email attribute if no user has been loaded', function() {
                expect($scope.user.email).toEqual('some@mail.com');
            });
        });

        describe('init a new user', function () {

            beforeEach(inject(function($controller) {
                $controller('ProfileCtrl', {$scope: $scope, user: null});
            }));


            it('should init empty name attribute if no user has been loaded', function() {
                expect($scope.user.name).toEqual('');
            });

            it('should init empty email attribute if no user has been loaded', function() {
                expect($scope.user.email).toEqual('');
            });
        });
    });

});