import { Test, TestingModule } from '@nestjs/testing';
import { GamePlayService } from './game-play.service';
import { GameService } from '../game/game.service';
import {
  Game,
  GamePieceType,
  PlayerColor,
  GameEventName
} from '@chess/shared/types';
import { chessBoardUtils } from '@chess/shared/chess-utils';
import { ChannelService } from '../channel/channel.service';

describe('GamePlayService', () => {
  let service: GamePlayService;
  let gameService: any;
  let channelService: any;

  beforeEach(async () => {
    gameService = { getGameByUser: jest.fn(), updateGame: jest.fn() };

    channelService = { sendEvent: jest.fn() };
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GamePlayService,
        {
          provide: GameService,
          useValue: gameService
        },
        { provide: ChannelService, useValue: channelService }
      ]
    }).compile();

    service = module.get<GamePlayService>(GamePlayService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('playStroke', () => {
    it('should do nothing if game does not exist', () => {
      gameService.getGameByUser.mockReturnValue(null);
      expect(channelService.sendEvent).not.toHaveBeenCalled();
    });

    describe('when game is on and stroke is valid', () => {
      let game: Game;
      let expectedGameResult: Game;

      beforeEach(() => {
        game = {
          whitePlayer: 'alice',
          blackPlayer: 'bob',
          currentTurn: PlayerColor.WHITE,
          board: {
            d4: { color: PlayerColor.WHITE, piece: GamePieceType.Pawn }
          },
          checked: null
        };

        gameService.getGameByUser.mockReturnValue({ ...game });
      });

      describe('when move is valid', () => {
        beforeEach(() => {
          chessBoardUtils.isMoveValid = () => true;
          service.playStroke('alice', { origin: 'd4', destination: 'd5' });

          expectedGameResult = {
            ...game,
            board: {
              d5: { color: PlayerColor.WHITE, piece: GamePieceType.Pawn }
            },
            currentTurn: PlayerColor.BLACK
          };
        });

        it('should warn the two players that move is valid', () => {
          expect(channelService.sendEvent).toHaveBeenCalledTimes(2);
          expect(channelService.sendEvent).toHaveBeenCalledWith('alice', {
            event: GameEventName.GAME_STATUS_UPDATE,
            data: expectedGameResult
          });
          expect(channelService.sendEvent).toHaveBeenCalledWith('bob', {
            event: GameEventName.GAME_STATUS_UPDATE,
            data: expectedGameResult
          });
        });

        it('should update the game', () => {
          expect(gameService.updateGame).toHaveBeenCalledWith(
            expectedGameResult
          );
        });
      });

      describe('when move is invalid', () => {
        beforeEach(() => {
          chessBoardUtils.isMoveValid = () => false;
          service.playStroke('alice', { origin: 'd4', destination: 'd5' });
        });

        it('should send invalid move to the user', () => {
          expect(channelService.sendEvent).toHaveBeenCalledWith('alice', {
            event: GameEventName.GAME_MOVE_INVALID
          });
        });
      });
    });
  });
});
