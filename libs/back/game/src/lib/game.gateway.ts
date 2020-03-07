import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { ChannelService } from './channel/channel.service';
import { GameEventName } from '@chess/shared/types';

@WebSocketGateway(3000)
export class GameGateway {
  @WebSocketServer()
  server: Server;

  constructor(private readonly channelService: ChannelService) {}

  @SubscribeMessage(GameEventName.AUTH)
  public authenticate(
    @MessageBody() userId: string,
    @ConnectedSocket() client: Socket
  ): void {
    this.channelService.authenticate(userId, client);
  }
}
