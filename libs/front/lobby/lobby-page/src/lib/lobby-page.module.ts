import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LobbyPageComponent } from './lobby-page.component';
import { GameSearchComponent } from './components/game-search/game-search.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [CommonModule, FormsModule],
  declarations: [LobbyPageComponent, GameSearchComponent],
  exports: [LobbyPageComponent]
})
export class LobbyPageModule {}
