import { GameService } from './game.service';
import { GameInfo } from '../model/game-info';
import { Subject } from 'rxjs';
import { Game, GameEventName, PlayerColor } from '@chess/shared/types';
import { take } from 'rxjs/operators';

describe('GameService', () => {
  let service: GameService;
  let communicationServiceMock: any;
  let userServiceMock: any;

  beforeEach(() => {
    communicationServiceMock = {
      sendEvent: jest.fn(),
      listenToEvent: jest.fn()
    };
    userServiceMock = { getUser: jest.fn() };
    service = new GameService(communicationServiceMock, userServiceMock);
  });

  describe('checkGame', () => {
    let gameSubject: Subject<Game>;
    let returnedGame: GameInfo;

    beforeEach(() => {
      gameSubject = new Subject<Game>();
      communicationServiceMock.listenToEvent.mockReturnValue(gameSubject);
      service
        .checkGame()
        .pipe(take(1))
        .subscribe(game => {
          returnedGame = game;
        });
    });

    it('should status event to request immediate update', () => {
      expect(communicationServiceMock.sendEvent).toHaveBeenCalledWith(
        GameEventName.GAME_STATUS
      );
    });

    it('should listen for status update from server', () => {
      expect(communicationServiceMock.listenToEvent).toHaveBeenCalledWith(
        GameEventName.GAME_STATUS_UPDATE
      );
    });

    const currentGame = {
      blackPlayer: 'alice',
      whitePlayer: 'bob',
      board: {},
      currentTurn: PlayerColor.BLACK
    } as Game;

    describe('when user is playing white', () => {
      beforeEach(() => {
        userServiceMock.getUser.mockReturnValue({ id: '123', name: 'bob' });
        gameSubject.next(currentGame);
      });

      it('should set my name as bob', () => {
        expect(returnedGame.myName).toEqual('bob');
      });

      it('should set playing as white', () => {
        expect(returnedGame.playAs).toEqual(PlayerColor.WHITE);
      });

      it('should set opponent color as black', () => {
        expect(returnedGame.opponentColor).toEqual(PlayerColor.BLACK);
      });

      it('should compute opponent name as the black player', () => {
        expect(returnedGame.opponentName).toEqual('alice');
      });

      it('should return the board', () => {
        expect(returnedGame.board).toBe(currentGame.board);
      });

      it('should set current turn', () => {
        expect(returnedGame.isMyTurn).toBe(false);
      });
    });

    describe('when user is playing black', () => {
      beforeEach(() => {
        userServiceMock.getUser.mockReturnValue({ id: '456', name: 'alice' });
        gameSubject.next(currentGame);
      });

      it('should set my name as alice', () => {
        expect(returnedGame.myName).toEqual('alice');
      });

      it('should set playing as black', () => {
        expect(returnedGame.playAs).toEqual(PlayerColor.BLACK);
      });

      it('should set opponent color as white', () => {
        expect(returnedGame.opponentColor).toEqual(PlayerColor.WHITE);
      });

      it('should compute opponent name as the white player', () => {
        expect(returnedGame.opponentName).toBe('bob');
      });

      it('should set current turn to true', () => {
        expect(returnedGame.isMyTurn).toBe(true);
      });
    });
  });

  describe('sendMove', () => {
    it('should send the move to the server', () => {
      service.sendMove('a2', 'b4');
      expect(communicationServiceMock.sendEvent).toHaveBeenCalledWith(
        GameEventName.GAME_MOVE,
        { origin: 'a2', destination: 'b4' }
      );
    });
  });
});
