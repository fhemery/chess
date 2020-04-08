import { GameGateway } from './game.gateway';
import { Socket } from 'socket.io';

describe('GameGateway', () => {
  let gameGateway: GameGateway;
  let channelService: any;
  let gameSearchService: any;
  let gameStatusService: any;
  let gamePlayService: any;

  beforeEach(() => {
    channelService = { authenticate: jest.fn() };
    gameSearchService = {
      addToWaitingList: jest.fn(),
      removeFromWaitingList: jest.fn()
    };
    gameStatusService = { getStatus: jest.fn() };
    gamePlayService = { playStroke: jest.fn() };
    gameGateway = new GameGateway(
      channelService,
      gameSearchService,
      gameStatusService,
      gamePlayService,
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

  describe('playStroke', () => {
    it('should call the game play service', () => {
      const stroke = {origin: 'd4', destination:'d5'};
      gameGateway.playStroke({userId: '123'} as unknown as Socket, stroke);
      expect(gamePlayService.playStroke).toHaveBeenCalledWith('123', stroke);
    });
  })
});
