import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { GameEventName } from '@chess/shared/types';

@Component({
  selector: 'ch-lb-lobby-page',
  templateUrl: './lobby-page.component.html',
  styleUrls: ['./lobby-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LobbyPageComponent implements OnInit {
  constructor(private readonly socket: Socket) {}

  ngOnInit(): void {
    this.socket.on(GameEventName.AUTH_OK, () => {
      console.log('ok, we are all set');
    });
  }

  searchGame($event: string) {
    this.socket.emit('auth', $event);
  }
}
