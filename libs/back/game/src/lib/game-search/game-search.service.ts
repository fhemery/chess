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
      this.gameRepository.isPlayerAlreadyInGame(userId) ||
      !!this.awaitingList.find(e => e === userId)
    ) {
      this.channelService.sendEvent(userId, {
        event: GameEventName.GAME_SEARCH_KO
      });
      return false;
    }
    console.log('adding', userId, 'to awaiting list');
    this.awaitingList.push(userId);
    this.channelService.sendEvent(userId, {
      event: GameEventName.GAME_SEARCH_OK
    });
    return true;
  }

  public getWaitingList(): string[] {
    return this.awaitingList;
  }

  public removeFromWaitingList(userId, notifyUser: boolean = true): void {
    this.awaitingList = this.awaitingList.filter(u => u !== userId);

    if(!notifyUser) {
      return;
    }

    this.channelService.sendEvent(userId, {
      event: GameEventName.GAME_SEARCH_CANCELLED
    });
  }
}
