import { Injectable } from '@nestjs/common';
import { GameEvent } from '@chess/shared/types';
import { Socket } from 'socket.io';

@Injectable()
export class ChannelRepository {
  private channelMap = new Map<string, Socket>();

  public sendEvent(userId: string, event: GameEvent): void {
    if (!this.channelMap.has(userId)) {
      return;
    }
    this.channelMap.get(userId).emit(event.event, event.data);
  }

  public registerSocket(id: string, client: Socket): void {
    this.channelMap.set(id, client);
  }
}
