import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from '@chess/back/user';
import { GameModule } from '@chess/back/game';

@Module({
  imports: [UserModule, GameModule],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
