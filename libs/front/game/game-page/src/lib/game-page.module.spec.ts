import { async, TestBed } from '@angular/core/testing';
import { GamePageModule } from './game-page.module';

describe('GamePageModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [GamePageModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(GamePageModule).toBeDefined();
  });
});
