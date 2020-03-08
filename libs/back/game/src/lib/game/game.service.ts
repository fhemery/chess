import { Injectable } from '@nestjs/common';

@Injectable()
export class GameService {

  public isPlayerAlreadyInAMatch(playerId: string) : boolean {
    return false;
  }
}
