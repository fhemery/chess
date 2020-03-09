import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GamePlayerComponent } from './game-player.component';
import { PlayerColor } from '@chess/shared/types';

describe('GameOpponentComponent', () => {
  let component: GamePlayerComponent;
  let fixture: ComponentFixture<GamePlayerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GamePlayerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GamePlayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('getOpponentImage', () => {
    it('should lowerCase color', () => {
      component.playerColor = PlayerColor.BLACK;
      expect(component.getOpponentImage()).toEqual('assets/chess_piece/black_pawn.png');
    })
  })
});
