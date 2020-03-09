import { UserId } from './shared-types';

export enum GameStatus {
  ONGOING = 'Ongoing',
  FINISHED_BLACK_WIN = 'Finished, black win',
  FINISHED_WHITE_WIN = 'Finished, white win',
  DRAW = 'Draw'
}

export enum PlayerColor {
  BLACK = 'Black',
  WHITE = 'White'
}

export interface Game {
  whitePlayer: UserId;
  blackPlayer: UserId;
  currentTurn: PlayerColor;
  checked: PlayerColor;
  board: GameBoard
}

export interface GamePiece {
  piece: GamePieceType,
  color: PlayerColor
}

export enum GamePieceType {
  Pawn = 'Pawn',
  Knight = 'Knight',
  Bishop = 'Bishop',
  Rook = 'Rook',
  King = 'King',
  Queen = 'Queen'
}

export interface GameBoard {
  [key: string]: GamePiece;
}
