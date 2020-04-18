import { GameBoard, GamePiece } from '@chess/shared/types';

const getPieceOnCell = (cell: string, gameBoard: GameBoard): GamePiece => {
  return gameBoard[cell] ?? null;
};

const isMoveValid = (origin: string, destination:string, gameBoard: GameBoard): boolean => {
  return true;
};

export const chessBoardUtils = {
  getPieceOnCell: getPieceOnCell,
  isMoveValid: isMoveValid
}
