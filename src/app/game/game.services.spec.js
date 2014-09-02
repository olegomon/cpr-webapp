describe('Game Services', function () {

    beforeEach(module('cpr'));

    var PlayerFactory, UserService, $q;

    beforeEach(inject(function (_$q_, _UserService_, _PlayerFactory_) {
        $q = _$q_;
        UserService = _UserService_;
        PlayerFactory = _PlayerFactory_;
    }));

    describe('PlayerFactory', function () {

        it('should create human player', inject(function (PlayerType) {
            var player = PlayerFactory.createHumanPlayer({ name: 'foo' });
            expect(player.name).toEqual('foo');
            expect(player.type).toEqual(PlayerType.HUMAN);

            player = PlayerFactory.createHumanPlayer({});
            expect(player.name).toEqual('Player');
            expect(player.type).toEqual(PlayerType.HUMAN);

            player = PlayerFactory.createHumanPlayer();
            expect(player.name).toEqual('Player');
            expect(player.type).toEqual(PlayerType.HUMAN);

        }));

        it('should create computer player', inject(function (PlayerType) {
            var player;

            player = PlayerFactory.createComputerPlayer({ name: 'foo' });
            expect(player.name).toEqual('foo');
            expect(player.type).toEqual(PlayerType.COMPUTER);

            player = PlayerFactory.createComputerPlayer({});
            expect(player.name).toEqual('Computer');
            expect(player.type).toEqual(PlayerType.COMPUTER);

            player = PlayerFactory.createComputerPlayer(null);
            expect(player.name).toEqual('Computer');
            expect(player.type).toEqual(PlayerType.COMPUTER);
        }));

    });

});