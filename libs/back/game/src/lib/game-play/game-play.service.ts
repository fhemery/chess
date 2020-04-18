import { Injectable } from '@nestjs/common';
import {
  GameEventName,
  PlayerColor,
  PlayStroke,
  UserId
} from '@chess/shared/types';
import { GameService } from '../game/game.service';
import { ChannelService } from '../channel/channel.service';
import { chessBoardUtils } from '@chess/shared/chess-utils';

@Injectable()
export class GamePlayService {
  constructor(
    private readonly gameService: GameService,
    private readonly channelService: ChannelService
  ) {}

  public playStroke(playerId: UserId, stroke: PlayStroke) {
    const game = this.gameService.getGameByUser(playerId);
    const board = game.board;

    if (!chessBoardUtils.isMoveValid(stroke.origin, stroke.destination, board)){
      this.channelService.sendEvent(playerId, {event: GameEventName.GAME_MOVE_INVALID});
      return;
    }

    // Play stroke
    board[stroke.destination] = board[stroke.origin];
    delete board[stroke.origin];
    game.currentTurn =
      game.currentTurn === PlayerColor.WHITE
        ? PlayerColor.BLACK
        : PlayerColor.WHITE;

    this.gameService.updateGame(game);
    const updateToSend = { event: GameEventName.GAME_STATUS_UPDATE, data: game };
    this.channelService.sendEvent(game.whitePlayer, updateToSend);
    this.channelService.sendEvent(game.blackPlayer, updateToSend);
  }
}
