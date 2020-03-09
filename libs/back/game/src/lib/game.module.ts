import { Module } from '@nestjs/common';
import { GameGateway } from './game.gateway';
import { ChannelService } from './channel/channel.service';
import { ChannelRepository } from './channel/channel.repository';
import { GameSearchService } from './game-search/game-search.service';
import { GameService } from './game/game.service';
import { MatchMakingService } from './match-making/match-making.service';
import { GameStatusService } from './game-status/game-status.service';

@Module({
  providers: [GameGateway, ChannelService, ChannelRepository, GameSearchService, GameService, MatchMakingService, GameStatusService],
})
export class GameModule {}
