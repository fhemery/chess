import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { ChannelService } from './channel/channel.service';
import { GameEventName, PlayStroke } from '@chess/shared/types';
import { UseInterceptors } from '@nestjs/common';
import { SocketAuthInterceptor } from './socket-auth-interceptor';
import { GameSearchService } from './game-search/game-search.service';
import { GameStatusService } from './game-status/game-status.service';
import { GamePlayService } from './game-play/game-play.service';

@WebSocketGateway(3000)
@UseInterceptors(SocketAuthInterceptor)
export class GameGateway {
  @WebSocketServer()
  server: Server;

  constructor(
    private readonly channelService: ChannelService,
    private readonly gameSearchService: GameSearchService,
    private readonly gameStatusService: GameStatusService,
    private readonly gamePlayService: GamePlayService,
  ) {}

  @SubscribeMessage(GameEventName.AUTH)
  public authenticate(
    @MessageBody() userId: string,
    @ConnectedSocket() client: Socket
  ): void {
    this.channelService.authenticate(userId, client);
  }

  @SubscribeMessage(GameEventName.GAME_SEARCH)
  public searchGame(@ConnectedSocket() client: Socket): void {
    this.gameSearchService.addToWaitingList(client['userId']);
  }

  @SubscribeMessage(GameEventName.GAME_SEARCH_CANCEL)
  public cancelGameSearch(@ConnectedSocket() client: Socket): void {
    this.gameSearchService.removeFromWaitingList(client['userId']);
  }

  @SubscribeMessage(GameEventName.GAME_STATUS)
  public getStatus(@ConnectedSocket() client: Socket): void {
    this.gameStatusService.getStatus(client['userId']);
  }

  @SubscribeMessage(GameEventName.GAME_MOVE)
  public playStroke(@ConnectedSocket() client: Socket, @MessageBody() stroke: PlayStroke): void {
    this.gamePlayService.playStroke(client['userId'], stroke);
  }
}
