import {
  async,
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick
} from '@angular/core/testing';

import { GameChessboardComponent } from './game-chessboard.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { PlayerColor } from '@chess/shared/types';
import { take } from 'rxjs/operators';

describe('GameChessboardComponent', () => {
  let component: GameChessboardComponent;
  let fixture: ComponentFixture<GameChessboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [GameChessboardComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GameChessboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('getColor', () => {
    it('should return black for even row + col', () => {
      expect(component.getColor('a', '1')).toBe(PlayerColor.BLACK);
      expect(component.getColor('g', '7')).toBe(PlayerColor.BLACK);
    });

    it('should return white for odd row + col', () => {
      expect(component.getColor('b', '1')).toBe(PlayerColor.WHITE);
      expect(component.getColor('e', '4')).toBe(PlayerColor.WHITE);
    });
  });

  describe('onCellClicked', () => {
    it('should forward clicked cell to parent component', fakeAsync(() => {
      let cell = '';
      component.cellClicked.pipe(take(1)).subscribe(n => (cell = n));
      component.onCellClicked('c3');
      tick();
      expect(cell).toBe('c3');
    }));
  });

  describe('isSelectedCell', () => {
    it('should return true if cell coordinates and selected cell matches', () => {
      component.selectedCell = 'a2';
      expect(component.isSelectedCell('a', '2')).toBe(true);
    });

    it('should return false else', () => {
      component.selectedCell = null;
      expect(component.isSelectedCell('a', '2')).toBe(false);
    });
  });
});
