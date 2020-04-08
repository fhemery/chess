import { GameService } from './game.service';
import { Game, GamePiece, GamePieceType, PlayerColor } from '@chess/shared/types';

describe('gameService', () => {
  let gameService: GameService;

  beforeEach(() => {
    gameService = new GameService();
  });

  describe('createGame', () => {
    let game: Game;
    beforeEach(() => {
      game = gameService.createGame('alice', 'bob');
    });

    it('should return a new initialized game', () => {
      expect(game).toBeTruthy();
      expect(game.whitePlayer).toBe('alice');
      expect(game.blackPlayer).toBe('bob');
      expect(game.checked).toBeNull();
      expect(game.currentTurn).toBe(PlayerColor.WHITE);
      expect(game.board).toBeTruthy();
    });

    const P = GamePieceType;
    const C = PlayerColor;
    const expectedPieces: { cell: string; piece: GamePiece }[] = [
      { cell: 'a1', piece: { piece: P.Rook, color: C.WHITE } },
      { cell: 'b1', piece: { piece: P.Knight, color: C.WHITE } },
      { cell: 'c1', piece: { piece: P.Bishop, color: C.WHITE } },
      { cell: 'd1', piece: { piece: P.Queen, color: C.WHITE } },
      { cell: 'e1', piece: { piece: P.King, color: C.WHITE } },
      { cell: 'f1', piece: { piece: P.Bishop, color: C.WHITE } },
      { cell: 'g1', piece: { piece: P.Knight, color: C.WHITE } },
      { cell: 'h1', piece: { piece: P.Rook, color: C.WHITE } },

      { cell: 'a2', piece: { piece: P.Pawn, color: C.WHITE } },
      { cell: 'b2', piece: { piece: P.Pawn, color: C.WHITE } },
      { cell: 'c2', piece: { piece: P.Pawn, color: C.WHITE } },
      { cell: 'd2', piece: { piece: P.Pawn, color: C.WHITE } },
      { cell: 'e2', piece: { piece: P.Pawn, color: C.WHITE } },
      { cell: 'f2', piece: { piece: P.Pawn, color: C.WHITE } },
      { cell: 'g2', piece: { piece: P.Pawn, color: C.WHITE } },
      { cell: 'h2', piece: { piece: P.Pawn, color: C.WHITE } },

      { cell: 'a8', piece: { piece: P.Rook, color: C.BLACK } },
      { cell: 'b8', piece: { piece: P.Knight, color: C.BLACK } },
      { cell: 'c8', piece: { piece: P.Bishop, color: C.BLACK } },
      { cell: 'd8', piece: { piece: P.Queen, color: C.BLACK } },
      { cell: 'e8', piece: { piece: P.King, color: C.BLACK } },
      { cell: 'f8', piece: { piece: P.Bishop, color: C.BLACK } },
      { cell: 'g8', piece: { piece: P.Knight, color: C.BLACK } },
      { cell: 'h8', piece: { piece: P.Rook, color: C.BLACK } },

      { cell: 'a7', piece: { piece: P.Pawn, color: C.BLACK } },
      { cell: 'b7', piece: { piece: P.Pawn, color: C.BLACK } },
      { cell: 'c7', piece: { piece: P.Pawn, color: C.BLACK } },
      { cell: 'd7', piece: { piece: P.Pawn, color: C.BLACK } },
      { cell: 'e7', piece: { piece: P.Pawn, color: C.BLACK } },
      { cell: 'f7', piece: { piece: P.Pawn, color: C.BLACK } },
      { cell: 'g7', piece: { piece: P.Pawn, color: C.BLACK } },
      { cell: 'h7', piece: { piece: P.Pawn, color: C.BLACK } },
    ];

    expectedPieces.forEach(({ cell, piece }) => {
      it(`should place correctly ${piece.color} ${piece.piece} in ${cell}`, () => {
        expect(game.board[cell]).toEqual(piece);
      });
    });
  });

  describe('getGameByUser', () => {
    it('should return nothing if user has no game', () => {
      expect(gameService.getGameByUser('Daniel')).toBeNull();
    });

    it('should return game if user is in a game', () => {
      gameService.createGame('alice', 'bob');
      expect(gameService.getGameByUser('alice')).toBeTruthy();
      expect(gameService.getGameByUser('bob')).toBeTruthy();
    });
  });

  describe('isPlayerAlreadyInGame', () => {
    it('should return false if user has no game', () => {
      expect(gameService.isPlayerAlreadyInGame('daniel')).toBe(false);
    });

    it('should return true if user has a game', () => {
      gameService.createGame('alice', 'bob');
      expect(gameService.isPlayerAlreadyInGame('alice')).toBe(true);
      expect(gameService.isPlayerAlreadyInGame('bob')).toBe(true);
    });
  });

  describe('updateGame', () => {
    it('should update the game entry for the two players', () => {
      const game = gameService.createGame('alice', 'bob');
      const gameUpdate = {...game, currentTurn: PlayerColor.BLACK};
      gameService.updateGame(gameUpdate);

      expect(gameService.getGameByUser('alice').currentTurn).toBe(PlayerColor.BLACK);
      expect(gameService.getGameByUser('bob').currentTurn).toBe(PlayerColor.BLACK);
    });
  });
});
