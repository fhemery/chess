import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GamePageComponent } from './game-page.component';
import { GameService } from './services/game.service';
import { EMPTY } from 'rxjs';
import { ChessboardStateService } from './services/chessboard-state.service';
import { GameInfo } from './model/game-info';

describe('GamePageComponent', () => {
  let component: GamePageComponent;
  let fixture: ComponentFixture<GamePageComponent>;
  let chessboardStateServiceMock: any;

  beforeEach(async(() => {
    const gameServiceMock = { checkGame: jest.fn() };
    chessboardStateServiceMock = { cellClicked: jest.fn() };
    gameServiceMock.checkGame.mockReturnValue(EMPTY);
    TestBed.configureTestingModule({
      declarations: [GamePageComponent],
      providers: [
        {
          provide: GameService,
          useValue: gameServiceMock
        },
        {
          provide: ChessboardStateService,
          useValue: chessboardStateServiceMock
        }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GamePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('onCellClicked', () => {
    it('should call the chessboard service', () => {
      component.game = {} as GameInfo;
      component.onCellClicked('d2');
      expect(chessboardStateServiceMock.cellClicked).toHaveBeenCalledWith('d2', expect.anything());
    });
  });
});
