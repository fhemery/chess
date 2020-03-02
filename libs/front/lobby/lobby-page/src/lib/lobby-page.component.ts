import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'ch-lb-lobby-page',
  templateUrl: './lobby-page.component.html',
  styleUrls: ['./lobby-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LobbyPageComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
