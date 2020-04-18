import { chessBoardUtils } from './chessboard-utils';
import { GameBoard, GamePieceType, PlayerColor } from '@chess/shared/types';

describe('chessboardUtils', () => {
  describe('getPieceOnCell', () => {
    it('should return null if there is no piece on the cell', () => {
      const piece = { color: PlayerColor.WHITE, piece: GamePieceType.King };
      expect(chessBoardUtils.getPieceOnCell('a1', { b7: piece })).toBeNull();
    });

    it('should return the piece if there is', () => {
      const piece = { color: PlayerColor.WHITE, piece: GamePieceType.King };
      expect(chessBoardUtils.getPieceOnCell('a1', { a1: piece })).toEqual(
        piece
      );
    });
  });

  describe('isMoveValid', () => {
    it('should forbid no move', () => {
      const board: GameBoard = {
        e2: { piece: GamePieceType.Pawn, color: PlayerColor.WHITE }
      };
      expect(chessBoardUtils.isMoveValid('e2', 'e2', board)).toBe(false);
    });

    it('should return false if there is no piece at the mentionned path', () => {
      expect(chessBoardUtils.isMoveValid('e2', 'e3', {})).toBe(false);
    });

    it('should return false if move is out of bounds', () => {
      const board: GameBoard = {
        e2: { piece: GamePieceType.Pawn, color: PlayerColor.WHITE }
      };
      expect(chessBoardUtils.isMoveValid('e2', 'e8', {})).toBe(false);
      expect(chessBoardUtils.isMoveValid('e2', 'h3', {})).toBe(false);
      expect(chessBoardUtils.isMoveValid('e2', 'e45', {})).toBe(false);
    });

    describe('for pawn move', () => {
      let basicPawnBoard: GameBoard;
      beforeEach(() => {
        basicPawnBoard = {
          e2: { piece: GamePieceType.Pawn, color: PlayerColor.WHITE },
          e7: { piece: GamePieceType.Pawn, color: PlayerColor.BLACK }
        };
      });

      it('should not allow lateral moves for pawn', () => {
        expect(chessBoardUtils.isMoveValid('e2', 'f2', basicPawnBoard)).toBe(
          false
        );
        expect(chessBoardUtils.isMoveValid('e7', 'f7', basicPawnBoard)).toBe(
          false
        );
      });

      it('should allow forward move on white pawn', () => {
        expect(chessBoardUtils.isMoveValid('e2', 'e3', basicPawnBoard)).toBe(true);
        expect(chessBoardUtils.isMoveValid('e7', 'e6', basicPawnBoard)).toBe(true);
      });

      it('should allow moving forward two cells if pawn has not moved yet', () => {
        expect(chessBoardUtils.isMoveValid('e2', 'e4', basicPawnBoard)).toBe(true);
        expect(chessBoardUtils.isMoveValid('e7', 'e5', basicPawnBoard)).toBe(true);
      });

      it('should not allow moving forward two cells if pawn has already moved', () => {
        basicPawnBoard.e3 = basicPawnBoard.e2;
        delete basicPawnBoard.e2;
        expect(chessBoardUtils.isMoveValid('e3', 'e5', basicPawnBoard)).toBe(false);

        basicPawnBoard.e6 = basicPawnBoard.e7;
        delete basicPawnBoard.e7;
        expect(chessBoardUtils.isMoveValid('e6', 'e4', basicPawnBoard)).toBe(false);
      });

      it('should not allow forward move if there is a piece on the path or at arrival', () => {
        basicPawnBoard.e3 = {color: PlayerColor.BLACK, piece: GamePieceType.Knight};
        basicPawnBoard.e6 = {color: PlayerColor.BLACK, piece: GamePieceType.Knight};

        expect(chessBoardUtils.isMoveValid('e2', 'e4', basicPawnBoard)).toBe(false);
        expect(chessBoardUtils.isMoveValid('e2', 'e3', basicPawnBoard)).toBe(false);
        expect(chessBoardUtils.isMoveValid('e7', 'e5', basicPawnBoard)).toBe(false);
        expect(chessBoardUtils.isMoveValid('e7', 'e6', basicPawnBoard)).toBe(false);
      });

      it('should never allow more than two cells forward', () => {
        expect(chessBoardUtils.isMoveValid('e2', 'e5', basicPawnBoard)).toBe(false);
        expect(chessBoardUtils.isMoveValid('e7', 'e4', basicPawnBoard)).toBe(false);
      });

      it('should never allow a pawn to move backward', () => {
        expect(chessBoardUtils.isMoveValid('e2', 'e1', basicPawnBoard)).toBe(false);
        expect(chessBoardUtils.isMoveValid('e7', 'e8', basicPawnBoard)).toBe(false);
      });

      it('should be able to move diagonally if there is an enemy to catch', () => {
        basicPawnBoard.d3 = {color: PlayerColor.BLACK, piece: GamePieceType.Rook};
        expect(chessBoardUtils.isMoveValid('e2', 'd3', basicPawnBoard)).toBe(true);

        basicPawnBoard.d6 = {color: PlayerColor.WHITE, piece: GamePieceType.Rook};
        expect(chessBoardUtils.isMoveValid('e7', 'd6', basicPawnBoard)).toBe(true);
      })
    });
  });
});
