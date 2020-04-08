import { Injectable } from '@nestjs/common';
import {
  GameEventName,
  PlayerColor,
  PlayStroke,
  UserId
} from '@chess/shared/types';
import { GameService } from '../game/game.service';
import { ChannelService } from '../channel/channel.service';

@Injectable()
export class GamePlayService {
  constructor(
    private readonly gameService: GameService,
    private readonly channelService: ChannelService
  ) {}

  public playStroke(playerId: UserId, stroke: PlayStroke) {
    const game = this.gameService.getGameByUser(playerId);

    // Play stroke
    const board = game.board;
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
