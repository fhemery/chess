import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import { ChannelService } from './channel/channel.service';
import { Client } from 'socket.io';

@Injectable()
export class SocketAuthInterceptor implements NestInterceptor {

  constructor(private readonly channelService: ChannelService) {
  }

  intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
    const client: Client= context.switchToWs().getClient();
    const id = context.switchToWs().getClient().id;
    const userId = this.channelService.getUserIdFromSocketId(id);
    if (!!userId) {
      client['userId'] = userId;
    }
    return next.handle();
  }

}
