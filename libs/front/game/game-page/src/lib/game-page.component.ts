import { Component, ChangeDetectionStrategy, OnInit, ChangeDetectorRef } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import { GameService } from './services/game.service';
import { GameInfo } from './model/game-info';
import { ChessboardStateService } from './services/chessboard-state.service';

@Component({
  selector: 'ch-ga-game-page',
  templateUrl: './game-page.component.html',
  styleUrls: ['./game-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GamePageComponent implements OnInit {
  public game: GameInfo;

  public selectedCell$: Observable<string>;

  private unsubscribe$ = new Subject<void>();

  constructor(private readonly gameService: GameService,
              private readonly chessboardStateService: ChessboardStateService,
              private changeDetectorRef: ChangeDetectorRef) {}

  public ngOnInit(): void {
    this.selectedCell$ = this.chessboardStateService.selectedCell$;
    this.gameService.checkGame().pipe(takeUntil(this.unsubscribe$)).subscribe(game => {
      this.game = game;
      this.changeDetectorRef.markForCheck();
    });
  }

  public onCellClicked(cellName: string) {
    this.chessboardStateService.cellClicked(cellName, this.game);

  }
}
