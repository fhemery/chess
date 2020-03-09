import { GameBoard, PlayerColor } from '@chess/shared/types';

export interface GameInfo {
  board: GameBoard;
  playAs: PlayerColor;
  isMyTurn: boolean;
  myName: string;
  opponentName: string;
  opponentColor: PlayerColor;
}
