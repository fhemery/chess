import {
  async,
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick
} from '@angular/core/testing';

import { GameSearchingComponent } from './game-searching.component';
import { take } from 'rxjs/operators';

describe('GameSearchingComponent', () => {
  let component: GameSearchingComponent;
  let fixture: ComponentFixture<GameSearchingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [GameSearchingComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GameSearchingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('onCancel', () => {
    it('should emit search cancelled', fakeAsync(() => {
      let isCancelled = false;
      component.cancelSearch
        .pipe(take(1))
        .subscribe(() => (isCancelled = true));
      component.onCancel();

      tick();
      expect(isCancelled).toBe(true);
    }));
  });
});
