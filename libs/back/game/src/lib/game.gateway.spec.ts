import { GameGateway } from './game.gateway';

describe('GameGateway', () => {
  let gameGateway: GameGateway;
  let channelService: any;

  beforeEach(() => {
    channelService = { authenticate: jest.fn() };
    gameGateway = new GameGateway(channelService);
  });

  describe('authenticate', () => {
    it('should call channelService to create channel', () => {
      gameGateway.authenticate('123', null);

      expect(channelService.authenticate).toHaveBeenCalledWith('123', null);
    });
  });
});
