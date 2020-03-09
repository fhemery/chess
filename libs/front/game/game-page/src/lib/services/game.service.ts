import { Injectable } from '@angular/core';
import { GameInfo } from '../model/game-info';
import { Observable } from 'rxjs';
import { CommunicationService } from '@chess/front/communication';
import { Game, GameEventName, PlayerColor } from '@chess/shared/types';
import { map } from 'rxjs/operators';
import { UserService } from '@chess/front/user';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  constructor(private readonly communicationService: CommunicationService,
              private readonly userService: UserService) {}

  public checkGame(): Observable<GameInfo> {
    const userName = this.userService.getUser()?.name;
    this.communicationService.sendEvent(GameEventName.AUTH, userName);
    this.communicationService.sendEvent(GameEventName.GAME_STATUS);
    return this.communicationService
      .listenToEvent<Game>(GameEventName.GAME_STATUS_UPDATE)
      .pipe(map(game => this.toGameInfo(game)));
  }

  private toGameInfo(game: Game): GameInfo {
    const userName = this.userService.getUser()?.name;

    const info =  {
      myName: userName,
      playAs: userName === game.whitePlayer ? PlayerColor.WHITE : PlayerColor.BLACK,
      opponentName: userName === game.whitePlayer ? game.blackPlayer : game.whitePlayer,
      opponentColor: userName === game.whitePlayer ? PlayerColor.BLACK : PlayerColor.WHITE,
      board: game.board,
      isMyTurn: undefined
    };
    return {
      ...info,
      isMyTurn: info.playAs === game.currentTurn
    };
  }
}
