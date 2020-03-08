import { Injectable } from '@nestjs/common';
import { GameService } from '../game/game.service';
import { ChannelService } from '../channel/channel.service';
import { GameEventName } from '@chess/shared/types';

@Injectable()
export class GameSearchService {
  private awaitingList: string[] = [];

  constructor(
    private readonly gameRepository: GameService,
    private readonly channelService: ChannelService
  ) {}

  public addToWaitingList(userId: string): boolean {
    if (
      this.gameRepository.isPlayerAlreadyInAMatch(userId) ||
      !!this.awaitingList.find(e => e === userId)
    ) {
      this.channelService.sendEvent(userId, {
        event: GameEventName.GAME_SEARCH_KO
      });
      return false;
    }
    this.awaitingList.push(userId);
    this.channelService.sendEvent(userId, {
      event: GameEventName.GAME_SEARCH_OK
    });
    return true;
  }

  public getWaitingList(): string[] {
    return this.awaitingList;
  }

  public removeFromWaitingList(userId): void {
    this.awaitingList = this.awaitingList.filter(u => u !== userId);
    this.channelService.sendEvent(userId, {
      event: GameEventName.GAME_SEARCH_CANCELLED
    });
  }
}
