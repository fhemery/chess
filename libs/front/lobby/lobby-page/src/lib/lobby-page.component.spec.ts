import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LobbyPageComponent } from './lobby-page.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { GameEventName } from '@chess/shared/types';

describe('LobbyPageComponent', () => {
  let component: LobbyPageComponent;
  let fixture: ComponentFixture<LobbyPageComponent>;
  let socketMock: any;

  beforeEach(() => {
    socketMock = { emit: jest.fn(), on: jest.fn() };
    TestBed.configureTestingModule({
      declarations: [ LobbyPageComponent ],
      providers: [{
        provide: Socket,
        useValue: socketMock
      }],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LobbyPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('searchgame', () => {
    it('should authenticate user by the server', () => {
      component.searchGame('bob');
      expect(socketMock.emit).toHaveBeenCalledWith(GameEventName.AUTH, 'bob');
    });
  })
});
