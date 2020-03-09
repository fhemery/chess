import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GamePageComponent } from './game-page.component';
import { GameService } from './services/game.service';
import { EMPTY } from 'rxjs';

describe('GamePageComponent', () => {
  let component: GamePageComponent;
  let fixture: ComponentFixture<GamePageComponent>;

  beforeEach(async(() => {
    const gameServiceMock = { checkGame: jest.fn() };
    gameServiceMock.checkGame.mockReturnValue(EMPTY);
    TestBed.configureTestingModule({
      declarations: [GamePageComponent],
      providers: [
        {
          provide: GameService,
          useValue: gameServiceMock
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

});
