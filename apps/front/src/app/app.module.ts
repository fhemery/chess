import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { LobbyPageComponent } from '@chess/lobby-page';
import { SocketIoConfig, SocketIoModule } from 'ngx-socket-io';
import { CookieService } from 'ngx-cookie-service';

const config: SocketIoConfig = { url: 'http://localhost:3000', options: {} };

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    RouterModule.forRoot(
      [
        {
          path: '',
          component: LobbyPageComponent
        },
        {
          path: 'game',
          loadChildren: () => import('@chess/front/game/game-page').then(
            m => m.GamePageModule
          )
        }
      ],
      { initialNavigation: 'enabled' }
    ),
    SocketIoModule.forRoot(config)
  ],
  providers: [CookieService],
  bootstrap: [AppComponent]
})
export class AppModule {}
