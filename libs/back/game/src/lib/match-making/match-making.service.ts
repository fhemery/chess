import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { GameSearchService } from '../game-search/game-search.service';
import { GameService } from '../game/game.service';

@Injectable()
export class MatchMakingService {

  constructor(private readonly gameSearchService: GameSearchService,
              private readonly gameService: GameService) {
  }

  @Cron(CronExpression.EVERY_5_SECONDS)
  public performMatchMaking() {
    let remainingPlayers = this.gameSearchService.getWaitingList();
    while(remainingPlayers.length >= 2) {
      const [player1, player2] = remainingPlayers;
      remainingPlayers = remainingPlayers.slice(2);
      this.gameService.createMatch(player1, player2);
      this.gameSearchService.removeFromWaitingList(player1, true);
      this.gameSearchService.removeFromWaitingList(player2, true);
    }
  }
}
