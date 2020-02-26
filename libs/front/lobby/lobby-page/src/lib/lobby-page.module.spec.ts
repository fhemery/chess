import { async, TestBed } from '@angular/core/testing';
import { LobbyPageModule } from './lobby-page.module';

describe('LobbyPageModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [LobbyPageModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(LobbyPageModule).toBeDefined();
  });
});
