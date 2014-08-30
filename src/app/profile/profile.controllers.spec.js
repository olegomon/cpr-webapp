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

        beforeEach(inject(function($controller, $rootScope, _$state_, _$q_) {
            $scope = $rootScope.$new();
            $controller('ProfileCtrl', {$scope: $scope});
            $state = _$state_;
            $q = _$q_;
        }));

        it('should init name attribute', function() {
            expect($scope.user.name).toEqual('');
        });

        it('should init name attribute', function() {
            expect($scope.user.name).toEqual('');
        });

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

});