import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GameChessCellComponent } from './game-chess-cell.component';
import { GamePieceType, PlayerColor } from '@chess/shared/types';

describe('GameChesscellComponent', () => {
  let component: GameChessCellComponent;
  let fixture: ComponentFixture<GameChessCellComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [GameChessCellComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GameChessCellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('getPieceImage', () => {
    it('should return proper asset path', () => {
      component.piece = { piece: GamePieceType.Rook, color: PlayerColor.BLACK };
      expect(component.getPieceImage()).toEqual(
        'assets/chess_piece/black_rook.png'
      );
    });
  });
});
