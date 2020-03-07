import { Module } from '@nestjs/common';
import { GameGateway } from './game.gateway';
import { ChannelService } from './channel/channel.service';
import { ChannelRepository } from './channel/channel.repository';

@Module({
  providers: [GameGateway, ChannelService, ChannelRepository],
})
export class GameModule {}
