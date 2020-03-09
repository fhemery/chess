import { Injectable } from '@nestjs/common';
import { ChannelRepository } from './channel.repository';
import { GameEvent, GameEventName } from '@chess/shared/types';
import { Socket } from 'socket.io';

@Injectable()
export class ChannelService {
  constructor(private readonly channelRepository: ChannelRepository) {}

  public sendEvent(userId: string, event: GameEvent) {
    return this.channelRepository.sendEvent(userId, event);
  }

  public authenticate(userId: string, client: Socket) {
    this.channelRepository.registerSocket(userId, client);
    this.channelRepository.sendEvent(userId, { event: GameEventName.AUTH_OK });
  }

  public getUserIdFromSocketId(socketId: string): string {
    return this.channelRepository.getUserIdFromSocketId(socketId);
  }
}
