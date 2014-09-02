describe('Game Routings', function () {

    var $q, $rootScope, $state, $injector, PlayerType, UserServiceMock;
    var loadUserDfd;

    beforeEach(module('cpr'));

    beforeEach(module(function ($provide) {
        UserServiceMock = {};
        $provide.value('UserService', UserServiceMock);
    }));

    beforeEach(inject(function (_$q_) {
        $q = _$q_;
    }));


    describe('user routings', function () {

        beforeEach(inject(function (_$rootScope_, _$state_, _$injector_, _PlayerType_) {

            $rootScope = _$rootScope_;
            $state = _$state_;
            $injector = _$injector_;
            PlayerType = _PlayerType_;
        }));

        it('should respond to URL /game', function () {
            expect($state.href('game')).toEqual('#/game');
        });

        it('should resolve human player on game URL', function () {
            var state = 'game';
            var player;

            loadUserDfd = $q.defer();

            UserServiceMock.loadUser = jasmine.createSpy().andCallFake(function () {
                return loadUserDfd.promise;
            });

            $state.go(state);

            loadUserDfd.resolve({
                name: 'some random user'
            });

            $rootScope.$apply();

            $injector.invoke($state.current.resolve.user).then(function(user) {
                player = user;
            });

            $rootScope.$apply();

            expect(player).toEqual({
                name: 'some random user',
                type: PlayerType.HUMAN
            });

            expect($state.current.name).toBe(state);
        });

    });
    describe('user routings', function () {

        it('should respond to URL /demo', function () {
            expect($state.href('demo')).toEqual('#/demo');
        });

        it('should resolve computer player on demo URL', function () {
            var state = 'demo';
            $state.go(state);
            $rootScope.$digest();
            expect($state.current.name).toBe(state);

            expect($injector.invoke($state.current.resolve.user)).toEqual({
                type: PlayerType.COMPUTER,
                name: 'Computer'
            });
        });
    });
});