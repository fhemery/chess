import { Injectable } from '@nestjs/common';
import {
  Game,
  GameBoard,
  GamePieceType,
  PlayerColor,
  UserId
} from '@chess/shared/types';

@Injectable()
export class GameService {
  private gameMap = new Map<UserId, Game>();

  public isPlayerAlreadyInGame(playerId: UserId): boolean {
    return this.gameMap.has(playerId);
  }

  public getGameByUser(playerId: UserId): Game {
    return this.gameMap.get(playerId) || null;
  }

  public createGame(player1Id: UserId, player2Id: UserId): Game {
    const newGame = {
      whitePlayer: player1Id,
      blackPlayer: player2Id,
      checked: null,
      currentTurn: PlayerColor.WHITE,
      board: this.createStartingBoard()
    };
    this.gameMap.set(player1Id, newGame);
    this.gameMap.set(player2Id, newGame);
    return newGame;
  }

  public updateGame(game: Game): void {
    this.gameMap.set(game.whitePlayer, game);
    this.gameMap.set(game.blackPlayer, game);
  }

  private createStartingBoard(): GameBoard {
    const board: GameBoard = {};
    const backPieces: GamePieceType[] = [
      GamePieceType.Rook,
      GamePieceType.Knight,
      GamePieceType.Bishop,
      GamePieceType.Queen,
      GamePieceType.King,
      GamePieceType.Bishop,
      GamePieceType.Knight,
      GamePieceType.Rook
    ];
    const columns = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];

    columns.map((c, index) => {
      board[`${c}1`] = {
        piece: backPieces[index],
        color: PlayerColor.WHITE
      };
      board[`${c}2`] = { piece: GamePieceType.Pawn, color: PlayerColor.WHITE };

      board[`${c}7`] = { piece: GamePieceType.Pawn, color: PlayerColor.BLACK };
      board[`${c}8`] = {
        piece: backPieces[index],
        color: PlayerColor.BLACK
      };
    });

    return board;
  }
}
