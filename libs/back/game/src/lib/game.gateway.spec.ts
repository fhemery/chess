import { GameGateway } from './game.gateway';
import { Socket } from 'socket.io';

describe('GameGateway', () => {
  let gameGateway: GameGateway;
  let channelService: any;
  let gameSearchService: any;
  let gameStatusService: any;

  beforeEach(() => {
    channelService = { authenticate: jest.fn() };
    gameSearchService = {
      addToWaitingList: jest.fn(),
      removeFromWaitingList: jest.fn()
    };
    gameStatusService = { getStatus: jest.fn() };
    gameGateway = new GameGateway(
      channelService,
      gameSearchService,
      gameStatusService
    );
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

  describe('getStatus', () => {
    it('should call the game status service', () => {
      gameGateway.getStatus(({ userId: '123' } as unknown) as Socket);
      expect(gameStatusService.getStatus).toHaveBeenCalledWith('123');
    });
  });
});
