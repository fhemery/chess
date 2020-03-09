import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from '@chess/back/user';
import { GameModule } from '@chess/back/game';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [UserModule, GameModule, ScheduleModule.forRoot()],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
