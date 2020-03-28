import { getPieceOnCell, isMoveValid } from '@chess/shared/chess-utils';
import { GamePieceType, PlayerColor } from '@chess/shared/types';

describe('chessboardUtils', () => {
  describe('getPieceOnCell', () => {
    it('should return null if there is no piece on the cell', () => {
      const piece = { color: PlayerColor.WHITE, piece: GamePieceType.King };
      expect(getPieceOnCell('a1', { b7: piece })).toBeNull();
    });

    it('should return the piece if there is', () => {
      const piece = { color: PlayerColor.WHITE, piece: GamePieceType.King };
      expect(getPieceOnCell('a1', { a1: piece })).toEqual(piece);
    });
  });

  describe('isMoveValid', () => {
    it('should return true', () => {
      expect(isMoveValid('a1', 'b3', {})).toBe(true);
    });
  });
});
