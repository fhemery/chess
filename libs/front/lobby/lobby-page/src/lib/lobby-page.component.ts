import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  OnDestroy
} from '@angular/core';
import { GameEventName } from '@chess/shared/types';
import { Subject } from 'rxjs';
import { take, takeUntil } from 'rxjs/operators';
import { Router } from '@angular/router';
import { CommunicationService } from '@chess/front/communication';
import { UserService } from '@chess/front/user';

@Component({
  selector: 'ch-lb-lobby-page',
  templateUrl: './lobby-page.component.html',
  styleUrls: ['./lobby-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LobbyPageComponent implements OnInit, OnDestroy {
  public isSearchOngoing = false;

  private unsubscribe$ = new Subject<void>();

  constructor(
    private readonly communicationService: CommunicationService,
    private readonly router: Router,
    private readonly userService: UserService
  ) {}

  public ngOnInit(): void {}

  public ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  public searchGame($event: string) {
    this.isSearchOngoing = true;
    this.userService.setUser({id: $event, name: $event});
    this.communicationService.sendEvent(GameEventName.AUTH, $event);
    this.communicationService
      .listenToEvent(GameEventName.AUTH_OK)
      .pipe(
        take(1),
        takeUntil(this.unsubscribe$)
      )
      .subscribe(() => {
        this.communicationService.sendEvent(GameEventName.GAME_SEARCH);
        this.communicationService
          .listenToEvent(GameEventName.GAME_FOUND)
          .pipe(
            take(1),
            takeUntil(this.unsubscribe$)
          )
          .subscribe(() => {
            this.router.navigateByUrl('game');
          });
      });
  }

  public cancelSearch() {
    this.communicationService.sendEvent(GameEventName.GAME_SEARCH_CANCEL);
    this.isSearchOngoing = false;
  }
}
