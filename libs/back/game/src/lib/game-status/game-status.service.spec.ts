import { GameStatusService } from './game-status.service';
import { GameEventName } from '@chess/shared/types';

describe('GameStatusService', () => {
  let gameStatusService: GameStatusService;
  let gameServiceMock: any;
  let channelServiceMock: any;

  beforeEach(() => {
    gameServiceMock = { getGameByUser: jest.fn() };
    channelServiceMock = { sendEvent: jest.fn() };
    gameStatusService = new GameStatusService(
      gameServiceMock,
      channelServiceMock
    );
  });

  describe('getStatus', () => {
    describe('when player has a game ongoing', () => {
      beforeEach(() => {
        gameServiceMock.getGameByUser.mockReturnValue({});
      });

      it('should send an event with the game', () => {
        gameStatusService.getStatus('bob');
        expect(channelServiceMock.sendEvent).toHaveBeenCalledWith('bob', {
          event: GameEventName.GAME_STATUS_UPDATE,
          data: {}
        });
      });
    });

    describe('when player has no game ongoing', function() {
      beforeEach(() => {
        gameServiceMock.getGameByUser.mockReturnValue(null);
      });

      it('should send game status KO', () => {
        gameStatusService.getStatus('bob');
        expect(channelServiceMock.sendEvent).toHaveBeenCalledWith('bob', {
          event: GameEventName.GAME_STATUS_KO
        });
      });
    });
  });
});
