import { GameGateway } from './game.gateway';
import { Socket } from 'socket.io';

describe('GameGateway', () => {
  let gameGateway: GameGateway;
  let channelService: any;
  let gameSearchService: any;

  beforeEach(() => {
    channelService = { authenticate: jest.fn() };
    gameSearchService = {
      addToWaitingList: jest.fn(),
      removeFromWaitingList: jest.fn()
    };
    gameGateway = new GameGateway(channelService, gameSearchService);
  });

  describe('authenticate', () => {
    it('should call channelService to create channel', () => {
      gameGateway.authenticate('123', null);

      expect(channelService.authenticate).toHaveBeenCalledWith('123', null);
    });
  });

  describe('searchGame', () => {
    it('should call to game search service', () => {
      gameGateway.searchGame(({ userId: '123' } as unknown) as Socket);
      expect(gameSearchService.addToWaitingList).toHaveBeenCalledWith('123');
    });
  });

  describe('cancelGameSearch', () => {
    it('should call to game search service', () => {
      gameGateway.cancelGameSearch(({ userId: '123' } as unknown) as Socket);
      expect(gameSearchService.removeFromWaitingList).toHaveBeenCalledWith(
        '123'
      );
    });
  });
});
