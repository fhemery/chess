import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { GamePiece } from '@chess/shared/types';

@Component({
  selector: 'ch-ga-game-chess-cell',
  templateUrl: './game-chess-cell.component.html',
  styleUrls: ['./game-chess-cell.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GameChessCellComponent implements OnInit {

  @Input() name: string;
  @Input() piece: GamePiece;

  constructor() { }

  ngOnInit(): void {
  }

  public getPieceImage() {
    return `assets/chess_piece/${this.piece.color?.toLowerCase()}_${this.piece.piece?.toLowerCase()}.png`;
  }
}
