import {
  async,
  ComponentFixture,
  fakeAsync,
  TestBed, tick
} from '@angular/core/testing';

import { GameSearchComponent } from './game-search.component';
import { take } from 'rxjs/operators';
import { FormsModule } from '@angular/forms';

describe('GameSearchComponent', () => {
  let component: GameSearchComponent;
  let fixture: ComponentFixture<GameSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [GameSearchComponent],
      imports: [FormsModule]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GameSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('submit', () => {
    it('should emit an event', fakeAsync(() => {
      let name = '';
      component.name = 'Bob';
      component.searchGame.pipe(take(1)).subscribe(n => {
        name = n;
      });

      component.submit();

      tick();
      expect(name).toBe('Bob');
    }));
  });
});
