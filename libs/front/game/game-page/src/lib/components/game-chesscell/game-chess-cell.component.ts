import { Component, OnInit, ChangeDetectionStrategy, Input, EventEmitter, Output } from '@angular/core';
import { GamePiece, PlayerColor } from '@chess/shared/types';

@Component({
  selector: 'ch-ga-game-chess-cell',
  templateUrl: './game-chess-cell.component.html',
  styleUrls: ['./game-chess-cell.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GameChessCellComponent implements OnInit {

  @Input() color: PlayerColor;
  @Input() name: string;
  @Input() piece: GamePiece;
  @Input() isSelected: boolean;

  @Output() cellClicked = new EventEmitter<string>();

  constructor() { }

  ngOnInit(): void {
  }

  public getPieceImage() {
    return `assets/chess_piece/${this.piece.color?.toLowerCase()}_${this.piece.piece?.toLowerCase()}.png`;
  }

  public onCellClicked() {
    this.cellClicked.emit(this.name);
  }
}
