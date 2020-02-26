import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LobbyPageComponent } from './lobby-page/lobby-page.component';

@NgModule({
  imports: [CommonModule],
  declarations: [LobbyPageComponent],
  exports: [LobbyPageComponent]
})
export class LobbyPageModule {}
