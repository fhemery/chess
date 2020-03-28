import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output
} from '@angular/core';
import { GameBoard, PlayerColor } from '@chess/shared/types';

@Component({
  selector: 'ch-ga-game-chessboard',
  templateUrl: './game-chessboard.component.html',
  styleUrls: ['./game-chessboard.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GameChessboardComponent implements OnInit {
  @Input() board: GameBoard = {};
  @Input() topColor: PlayerColor;
  @Input() selectedCell: string;

  @Output() cellClicked = new EventEmitter<string>();

  public columns = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
  public rows = ['1', '2', '3', '4', '5', '6', '7', '8'];

  constructor() {}

  public ngOnInit(): void {
    if (this.topColor === PlayerColor.BLACK) {
      this.rows = this.rows.reverse();
    }
  }

  public getColor(column: string, row: string): PlayerColor {
    const add = (this.rows.indexOf(row) + this.columns.indexOf(column)) % 2;
    return add === 0 ? PlayerColor.BLACK : PlayerColor.WHITE;
  }

  public onCellClicked(cellName: string) {
    this.cellClicked.emit(cellName);
  }

  public isSelectedCell(column: string, row: string): boolean {
    return column + row === this.selectedCell;
  }
}
