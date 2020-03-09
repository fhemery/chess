import { GameSearchService } from './game-search.service';
import { GameEventName } from '@chess/shared/types';

describe('gameSearchService', () => {
  let gameSearchService: GameSearchService;
  let gameRepoMock: any;
  let channelMock: any;

  beforeEach(() => {
    gameRepoMock = {
      isPlayerAlreadyInGame: jest.fn()
    };
    channelMock = {
      sendEvent: jest.fn()
    };

    gameSearchService = new GameSearchService(gameRepoMock, channelMock);
  });

  it('should create', () => {
    expect(gameSearchService).toBeTruthy();
  });

  describe('addToMatchSearch', () => {
    it('should return false and emit GAME_SEARCH_KO if user is already in a match', () => {
      const userId = 'bob';
      gameRepoMock.isPlayerAlreadyInGame.mockReturnValue(true);

      const result = gameSearchService.addToWaitingList(userId);

      expect(result).toBe(false);
      expect(channelMock.sendEvent).toHaveBeenCalledWith(userId, {
        event: GameEventName.GAME_SEARCH_KO
      });
    });

    it('should return GAME_SEARCH_KO is user is already waiting', () => {
      const userId = 'harry';
      gameSearchService.addToWaitingList(userId);

      const result = gameSearchService.addToWaitingList(userId);
      expect(result).toBe(false);
      expect(channelMock.sendEvent).toHaveBeenCalledWith(userId, {
        event: GameEventName.GAME_SEARCH_KO
      });
    });

    describe('when user is valid', () => {
      it('should return true and add user to waiting list', () => {
        const userId = 'henri';
        gameRepoMock.isPlayerAlreadyInGame.mockReturnValue(false);

        const result = gameSearchService.addToWaitingList(userId);
        expect(result).toBe(true);
        expect(gameSearchService.getWaitingList()).toEqual([userId]);
      });

      it('should emit GAME_SEARCH_OK', () => {
        const userId = 'mark';
        gameRepoMock.isPlayerAlreadyInGame.mockReturnValue(false);

        gameSearchService.addToWaitingList(userId);
        expect(channelMock.sendEvent).toHaveBeenCalledWith(userId, {
          event: GameEventName.GAME_SEARCH_OK
        });
      });
    });
  });

  describe('getAwaitingList', () => {
    it('should return empty array by default', () => {
      expect(gameSearchService.getWaitingList()).toEqual([]);
    });
  });

  describe('removeFromWaitingList', () => {
    it('should emit GAME_SEARCH_CANCELLED by default even if user is not on waiting list', () => {
      gameSearchService.removeFromWaitingList('anna');
      expect(channelMock.sendEvent).toHaveBeenCalledWith('anna', {
        event: GameEventName.GAME_SEARCH_CANCELLED
      });
    });

    it('should not emit GAME_SEARCH_CANCELLED if notification is disabled', () => {
      gameSearchService.removeFromWaitingList('anna', false);
      expect(channelMock.sendEvent).not.toHaveBeenCalled();
    });

    it('should remove user from waiting list if he was in', () => {
      const userId = 'william';
      gameSearchService.addToWaitingList(userId);
      gameSearchService.removeFromWaitingList(userId);

      expect(gameSearchService.getWaitingList()).toEqual([]);
    });
  });
});
