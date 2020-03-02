import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'ch-lb-game-search',
  templateUrl: './game-search.component.html',
  styleUrls: ['./game-search.component.scss']
})
export class GameSearchComponent implements OnInit {
  @Input() public currentName = '';
  @Output() public searchGame = new EventEmitter<string>();

  public name: string;

  public constructor() {
  }

  public ngOnInit(): void {
    this.name = this.currentName;
  }

  public submit(): void {
    this.searchGame.emit(this.name);
  }
}
