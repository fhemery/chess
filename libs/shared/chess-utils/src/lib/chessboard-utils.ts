import { GameBoard, GamePiece, GamePieceType } from '@chess/shared/types';
import { areCoordinatesValid } from './internal/move-utils';
import { checkPawnMove } from './internal/pawn-move-utils';

const getPieceOnCell = (cell: string, gameBoard: GameBoard): GamePiece => {
  return gameBoard[cell] ? gameBoard[cell] : null;
};

const isMoveValid = (
  origin: string,
  destination: string,
  gameBoard: GameBoard
): boolean => {
  if (!areCoordinatesValid(origin, destination)) {
    return false;
  }
  const piece = gameBoard[origin];
  if (!piece) {
    return false;
  }

  switch (piece.piece) {
    case GamePieceType.Pawn:
      return checkPawnMove(origin, destination, piece, gameBoard);
      break;

    default:
      break;
  }

  return true;
};

export const chessBoardUtils = {
  getPieceOnCell: getPieceOnCell,
  isMoveValid: isMoveValid
};
