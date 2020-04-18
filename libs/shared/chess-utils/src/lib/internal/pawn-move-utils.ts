import { GameBoard, GamePiece, PlayerColor } from '@chess/shared/types';
import { computeMoveChange, getOppositeColor, hasPieceOnPath, MoveChange } from './move-utils';

const isPawnAtStartPoint = (origin: string, color: PlayerColor): boolean => {
  return (
    (color === PlayerColor.WHITE && origin[1] === '2') ||
    (color === PlayerColor.BLACK && origin[1] === '7')
  );
};

export const checkPawnMove = (
  origin: string,
  destination: string,
  piece: GamePiece,
  gameBoard: GameBoard
) => {
  const moveChange: MoveChange = computeMoveChange(
    origin,
    destination,
    piece.color
  );
  if (moveChange.lateral > 0) {
    if (moveChange.lateral > 1 || moveChange.forward !== 1) {
      return false;
    }
    return (
      !!gameBoard[destination] &&
      gameBoard[destination].color === getOppositeColor(piece.color)
    );
  }

  if (moveChange.forward > 2 || moveChange.forward < 0) {
    return false;
  }

  if (
    moveChange.forward === 2 &&
    (!isPawnAtStartPoint(origin, piece.color) ||
      hasPieceOnPath(origin, destination, gameBoard))
  ) {
    return false;
  }

  if (gameBoard[destination]) {
    return false;
  }

  return true;
};
