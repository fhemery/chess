import { Injectable } from '@nestjs/common';
import { GameService } from '../game/game.service';
import { ChannelService } from '../channel/channel.service';
import { GameEventName, UserId } from '@chess/shared/types';

@Injectable()
export class GameStatusService {
  constructor(
    private readonly gameService: GameService,
    private readonly channelService: ChannelService
  ) {}

  public getStatus(userId: UserId): void {
    const game = this.gameService.getGameByUser(userId);
    if (!game) {
      this.channelService.sendEvent(userId, {
        event: GameEventName.GAME_STATUS_KO
      });
      return;
    }
    this.channelService.sendEvent(userId, {
      event: GameEventName.GAME_STATUS_UPDATE,
      data: game
    });
  }
}
