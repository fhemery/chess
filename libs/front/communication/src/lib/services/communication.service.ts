import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CommunicationService {
  constructor(private socket: Socket) {}

  public sendEvent(name: string, data?: any): void {
    this.socket.emit(name, data);
  }

  public listenToEvent<T>(name: string): Observable<T> {
    return this.socket.fromEvent<T>(name);
  }
}
