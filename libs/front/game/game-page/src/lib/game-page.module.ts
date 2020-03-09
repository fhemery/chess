import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Route } from '@angular/router';
import { GamePageComponent } from './game-page.component';
import { GamePlayerComponent } from './components/game-opponent/game-player.component';
import { GameChessboardComponent } from './components/game-chessboard/game-chessboard.component';
import { GameChessCellComponent } from './components/game-chesscell/game-chess-cell.component';

export const gamePageRoutes: Route[] = [{
  path: '',
  component: GamePageComponent
}];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(gamePageRoutes)],
  declarations: [GamePageComponent, GamePlayerComponent, GameChessboardComponent, GameChessCellComponent],
  exports: [GamePageComponent]
})
export class GamePageModule {}
