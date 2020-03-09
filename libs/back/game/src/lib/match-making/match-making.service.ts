import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { GameSearchService } from '../game-search/game-search.service';
import { GameService } from '../game/game.service';
import { ChannelService } from '../channel/channel.service';
import { GameEventName } from '@chess/shared/types';

@Injectable()
export class MatchMakingService {

  constructor(private readonly gameSearchService: GameSearchService,
              private readonly gameService: GameService,
              private readonly channelService: ChannelService) {
  }

  @Cron(CronExpression.EVERY_5_SECONDS)
  public performMatchMaking() {
    let remainingPlayers = this.gameSearchService.getWaitingList();
    console.log('Match making started', remainingPlayers);
    while(remainingPlayers.length >= 2) {
      console.log('creating a game');
      const [player1, player2] = remainingPlayers;
      remainingPlayers = remainingPlayers.slice(2);
      const board = this.gameService.createGame(player1, player2);
      this.gameSearchService.removeFromWaitingList(player1, true);
      this.gameSearchService.removeFromWaitingList(player2, true);
      this.channelService.sendEvent(player1, {event: GameEventName.GAME_FOUND, data: board });
      this.channelService.sendEvent(player2, {event: GameEventName.GAME_FOUND, data: board });
    }
  }
}
