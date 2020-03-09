import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Route } from '@angular/router';
import { GamePageComponent } from './game-page.component';

export const gamePageRoutes: Route[] = [{
  path: '/',
  component: GamePageComponent
}];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(gamePageRoutes)],
  declarations: [GamePageComponent]
})
export class GamePageModule {}
