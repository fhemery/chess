import {
  Component,
  ChangeDetectionStrategy,
  EventEmitter, Output
} from '@angular/core';

@Component({
  selector: 'ch-lb-game-searching',
  templateUrl: './game-searching.component.html',
  styleUrls: ['./game-searching.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GameSearchingComponent {
  @Output() public cancelSearch = new EventEmitter<void>();

  public onCancel() {
    this.cancelSearch.emit();
  }
}
