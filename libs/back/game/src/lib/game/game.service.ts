import { Injectable } from '@nestjs/common';

@Injectable()
export class GameService {

  public isPlayerAlreadyInAMatch(playerId: string) : boolean {
    return false;
  }

  public createMatch(player1Id: string, player2Id: string): void {

  }
}
