import { Component, ChangeDetectionStrategy, OnInit, ChangeDetectorRef } from '@angular/core';
import { Subject } from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import { GameService } from './services/game.service';
import { GameInfo } from './model/game-info';

@Component({
  selector: 'ch-ga-game-page',
  templateUrl: './game-page.component.html',
  styleUrls: ['./game-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GamePageComponent implements OnInit {
  public game: GameInfo;

  private unsubscribe$ = new Subject<void>();

  constructor(private readonly gameService: GameService, private changeDetectorRef: ChangeDetectorRef) {}

  public ngOnInit(): void {
    this.gameService.checkGame().pipe(takeUntil(this.unsubscribe$)).subscribe(game => {
      this.game = game;
      this.changeDetectorRef.markForCheck();
    });
  }
}
