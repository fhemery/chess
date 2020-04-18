import { GameBoard, PlayerColor } from '@chess/shared/types';

export const chessBoardRows = ['1', '2', '3', '4', '5', '6', '7', '8'];
export const chessBoardCols = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];

export interface MoveChange {
  forward: number;
  lateral: number;
}

export const getOppositeColor = (color: PlayerColor): PlayerColor => {
  return color === PlayerColor.BLACK ? PlayerColor.WHITE : PlayerColor.BLACK;
};

export const areCoordinatesValid = (
  origin: string,
  destination: string
): boolean => {
  if (origin === destination) {
    return false;
  }

  if (origin.length !== 2 || destination.length !== 2) {
    return false;
  }

  if (
    chessBoardCols.indexOf(origin[0]) < 0 ||
    chessBoardCols.indexOf(destination[0]) < 0 ||
    chessBoardRows.indexOf(origin[1]) < 0 ||
    chessBoardRows.indexOf(destination[1]) < 0
  ) {
    return false;
  }

  return true;
};

export const computeMoveChange = (
  origin: string,
  destination: string,
  color: PlayerColor
): MoveChange => {
  const move = {
    forward:
      chessBoardRows.indexOf(destination[1]) -
      chessBoardRows.indexOf(origin[1]),
    lateral: Math.abs(
      chessBoardCols.indexOf(destination[0]) - chessBoardCols.indexOf(origin[0])
    )
  };

  if (color === PlayerColor.BLACK) {
    move.forward *= -1;
  }

  return move;
};

const getIntermediaryCells = (
  origin: string,
  destination: string
): string[] => {
  const originColIndex = chessBoardCols.indexOf(origin[0]);
  const destinationColIndex = chessBoardCols.indexOf(destination[0]);
  const originRowIndex = chessBoardRows.indexOf(origin[1]);
  const destinationRowIndex = chessBoardRows.indexOf(destination[1]);

  let colChanges = chessBoardCols.slice(
    Math.min(originColIndex, destinationColIndex) + 1,
    Math.max(originColIndex, destinationColIndex) - 1
  );
  if (originColIndex > destinationColIndex) {
    colChanges = colChanges.reverse();
  }

  let rowChanges = chessBoardRows.slice(
    Math.min(originRowIndex, destinationRowIndex) + 1,
    Math.max(originRowIndex, destinationRowIndex)
  );
  if (originRowIndex > destinationRowIndex) {
    rowChanges = rowChanges.reverse();
  }

  if (colChanges.length === 0) {
    return rowChanges.map(r => `${origin[0]}${r}`);
  }

  if (rowChanges.length === 0) {
    return colChanges.map(c => `${c}${origin[1]}`);
  }

  return colChanges.map((c, index) => `${c}${rowChanges[index]}`);
};

export const hasPieceOnPath = (
  origin: string,
  destination: string,
  gameBoard: GameBoard
): boolean => {
  const deltaRows = Math.abs(
    chessBoardRows.indexOf(origin[1]) - chessBoardRows.indexOf(destination[1])
  );
  const deltaCols = Math.abs(
    chessBoardCols.indexOf(origin[0]) - chessBoardCols.indexOf(destination[0])
  );

  if (deltaRows !== 0 && deltaCols !== 0 && deltaRows !== deltaCols) {
    throw Error(
      `Move error: ${origin} -> ${destination} is neither a straight nor a diagonal move`
    );
  }

  const intermediaryCells: string[] = getIntermediaryCells(origin, destination);
  if (!!intermediaryCells.find(c => !!gameBoard[c])) {
    return true;
  }

  return false;
};
