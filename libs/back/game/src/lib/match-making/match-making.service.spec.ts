import { MatchMakingService } from './match-making.service';

describe('MatchMaking service', () => {
  let matchMakingService: MatchMakingService;
  let gameSearchServiceMock: any;
  let gameServiceMock: any;

  beforeEach(() => {
    gameSearchServiceMock = {
      getWaitingList: jest.fn(),
      removeFromWaitingList: jest.fn()
    };
    gameServiceMock = { createMatch: jest.fn() };
    matchMakingService = new MatchMakingService(
      gameSearchServiceMock,
      gameServiceMock
    );
  });

  describe('performMatchMaking', () => {
    it('should do nothing when there is no player', () => {
      gameSearchServiceMock.getWaitingList.mockReturnValue([]);

      matchMakingService.performMatchMaking();

      expect(gameServiceMock.createMatch).not.toHaveBeenCalled();
    });

    it('should do nothing if there is only one player', () => {
      gameSearchServiceMock.getWaitingList.mockReturnValue(['bob']);

      matchMakingService.performMatchMaking();

      expect(gameServiceMock.createMatch).not.toHaveBeenCalled();
    });

    it('should create a match if there are two players', () => {
      gameSearchServiceMock.getWaitingList.mockReturnValue(['bob', 'andy']);
      matchMakingService.performMatchMaking();
      expect(gameServiceMock.createMatch).toHaveBeenCalledWith('bob', 'andy');
    });

    it('should remove the two players from the list', () => {
      gameSearchServiceMock.getWaitingList.mockReturnValue(['bob', 'andy']);
      matchMakingService.performMatchMaking();
      expect(gameSearchServiceMock.removeFromWaitingList).toHaveBeenCalledWith(
        'bob',
        true
      );
      expect(gameSearchServiceMock.removeFromWaitingList).toHaveBeenCalledWith(
        'andy',
        true
      );
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

      expect(gameServiceMock.createMatch).toHaveBeenCalledTimes(2);
      expect(gameSearchServiceMock.removeFromWaitingList).toHaveBeenCalledTimes(
        4
      );
    });
  });
});
