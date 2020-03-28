import { GameBoard, GamePiece } from '@chess/shared/types';

export const getPieceOnCell = (cell: string, gameBoard: GameBoard): GamePiece => {
  return gameBoard[cell] ?? null;
};

export const isMoveValid = (origin: string, destination:string, gameBoard: GameBoard): boolean => {
  return true;
};
