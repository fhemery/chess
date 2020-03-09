import { async, TestBed } from '@angular/core/testing';
import { CommunicationModule } from './communication.module';

describe('CommunicationModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [CommunicationModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(CommunicationModule).toBeDefined();
  });
});
