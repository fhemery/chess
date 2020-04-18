import { Injectable } from '@angular/core';
import { GameInfo } from '../model/game-info';
import { BehaviorSubject, Observable } from 'rxjs';
import { chessBoardUtils } from '@chess/shared/chess-utils';
import { distinctUntilChanged } from 'rxjs/operators';
import { GameService } from './game.service';

@Injectable({
  providedIn: 'root'
})
export class ChessboardStateService {
  public selectedCell$: Observable<string>;
  private selectedCellSubject: BehaviorSubject<string>;

  constructor(private readonly gameService: GameService) {
    this.selectedCellSubject = new BehaviorSubject<string>(null);
    this.selectedCell$ = this.selectedCellSubject.asObservable().pipe(distinctUntilChanged());
  }

  public cellClicked(cellName: string, game: GameInfo) {
    if (cellName === this.selectedCellSubject.getValue() || !game.isMyTurn) {
      this.selectedCellSubject.next(null);
      return;
    }

    const piece = chessBoardUtils.getPieceOnCell(cellName, game.board);
    if (piece?.color === game.playAs) {
      this.selectedCellSubject.next(cellName);
      return;
    }

    const currentSelectedCell = this.selectedCellSubject.getValue();
    if (currentSelectedCell && chessBoardUtils.isMoveValid(currentSelectedCell, cellName, game.board)) {
      this.selectedCellSubject.next(null);
      this.gameService.sendMove(currentSelectedCell, cellName);
      return;
    }

    this.selectedCellSubject.next(null);
  }
}
