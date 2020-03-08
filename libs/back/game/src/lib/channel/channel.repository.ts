import { Injectable } from '@nestjs/common';
import { GameEvent } from '@chess/shared/types';
import { Socket } from 'socket.io';

@Injectable()
export class ChannelRepository {
  private userSocketMap = new Map<string, Socket>();
  private socketUserMap = new Map<string, string>();

  public sendEvent(userId: string, event: GameEvent): void {
    if (!this.userSocketMap.has(userId)) {
      return;
    }
    this.userSocketMap.get(userId).emit(event.event, event.data);
  }

  public registerSocket(userId: string, client: Socket): void {
    this.userSocketMap.set(userId, client);
    this.socketUserMap.set(client.id, userId);
  }

  public getUserIdFromSocketId(socketId: string): string {
    return this.socketUserMap.get(socketId);
  }
}
