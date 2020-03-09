import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { PlayerColor } from '@chess/shared/types';

@Component({
  selector: 'ch-ga-game-player',
  templateUrl: './game-player.component.html',
  styleUrls: ['./game-player.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GamePlayerComponent {

  @Input() playerName: string;
  @Input() playerColor: PlayerColor;
  @Input() isPlayerTurn: boolean;

  public getOpponentImage() {
    return `assets/chess_piece/${this.playerColor?.toLowerCase()}_pawn.png`;
  }
}
