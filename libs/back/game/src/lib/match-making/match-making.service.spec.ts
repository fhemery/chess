import { MatchMakingService } from './match-making.service';
import { GameEventName } from '@chess/shared/types';

describe('MatchMaking service', () => {
  let matchMakingService: MatchMakingService;
  let gameSearchServiceMock: any;
  let gameServiceMock: any;
  let channelService: any;

  beforeEach(() => {
    gameSearchServiceMock = {
      getWaitingList: jest.fn(),
      removeFromWaitingList: jest.fn()
    };
    gameServiceMock = { createGame: jest.fn() };
    channelService = { sendEvent: jest.fn() };

    matchMakingService = new MatchMakingService(
      gameSearchServiceMock,
      gameServiceMock,
      channelService
    );
  });

  describe('performMatchMaking', () => {
    it('should do nothing when there is no player', () => {
      gameSearchServiceMock.getWaitingList.mockReturnValue([]);

      matchMakingService.performMatchMaking();

      expect(gameServiceMock.createGame).not.toHaveBeenCalled();
    });

    it('should do nothing if there is only one player', () => {
      gameSearchServiceMock.getWaitingList.mockReturnValue(['bob']);

      matchMakingService.performMatchMaking();

      expect(gameServiceMock.createGame).not.toHaveBeenCalled();
    });

    describe('when there are two players', () => {
      beforeEach(() => {
        gameSearchServiceMock.getWaitingList.mockReturnValue(['bob', 'andy']);
        gameServiceMock.createGame.mockReturnValue({});
        matchMakingService.performMatchMaking();
      });

      it('should create a match if there are two players', () => {
        expect(gameServiceMock.createGame).toHaveBeenCalledWith('bob', 'andy');
      });

      it('should remove the two players from the list', () => {
        expect(
          gameSearchServiceMock.removeFromWaitingList
        ).toHaveBeenCalledWith('bob', true);
        expect(
          gameSearchServiceMock.removeFromWaitingList
        ).toHaveBeenCalledWith('andy', true);
      });

      it('should warn the two players that match is started', () => {
        expect(channelService.sendEvent).toHaveBeenCalledWith('bob', {
          event: GameEventName.GAME_FOUND,
          data: expect.anything()
        });
        expect(channelService.sendEvent).toHaveBeenCalledWith('andy', {
          event: GameEventName.GAME_FOUND,
          data: expect.anything()
        });
      });
    });

    it('should create matches as long as there are player pairs', () => {
      gameSearchServiceMock.getWaitingList.mockReturnValue([
        'andy',
        'bob',
        'carla',
        'daniel',
        'emily'
      ]);
      matchMakingService.performMatchMaking();

      expect(gameServiceMock.createGame).toHaveBeenCalledTimes(2);
      expect(gameSearchServiceMock.removeFromWaitingList).toHaveBeenCalledTimes(
        4
      );
    });
  });
});
