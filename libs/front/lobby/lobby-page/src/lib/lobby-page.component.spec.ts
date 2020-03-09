import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LobbyPageComponent } from './lobby-page.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { GameEventName } from '@chess/shared/types';
import { Subject } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import SpyInstance = jest.SpyInstance;
import { CommunicationService } from '@chess/front/communication';
import { UserService } from '@chess/front/user';

describe('LobbyPageComponent', () => {
  let component: LobbyPageComponent;
  let fixture: ComponentFixture<LobbyPageComponent>;
  let communicationServiceMock: any;
  let userServiceMock: any;

  beforeEach(() => {
    communicationServiceMock = {
      sendEvent: jest.fn(),
      listenToEvent: jest.fn()
    };
    userServiceMock = {
      setUser: jest.fn()
    };
    TestBed.configureTestingModule({
      declarations: [LobbyPageComponent],
      imports: [RouterTestingModule],
      providers: [
        {
          provide: CommunicationService,
          useValue: communicationServiceMock
        },
        {
          provide: UserService,
          useValue: userServiceMock
        }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LobbyPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should not be searching', () => {
    expect(component.isSearchOngoing).toBe(false);
  });

  describe('searchgame', () => {
    let listenSubject: Subject<void>;
    beforeEach(() => {
      listenSubject = new Subject<void>();
      communicationServiceMock.listenToEvent.mockReturnValue(listenSubject);
      component.searchGame('bob');
    });

    it('should set search to be ongoing', () => {
      expect(component.isSearchOngoing).toBe(true);
    });

    it('should authenticate user by the server', () => {
      expect(communicationServiceMock.sendEvent).toHaveBeenCalledWith(
        GameEventName.AUTH,
        'bob'
      );
    });

    it('should listen to auth_OK event and send back searchGame', () => {
      expect(communicationServiceMock.listenToEvent).toHaveBeenCalledWith(
        GameEventName.AUTH_OK
      );
    });

    describe('when authentication is ok', () => {
      beforeEach(() => {
        listenSubject.next();
      });

      it('should send a game search event', () => {
        expect(communicationServiceMock.sendEvent).toHaveBeenCalledWith(
          GameEventName.GAME_SEARCH
        );
      });

      it('should subscribe to game:found', () => {
        expect(communicationServiceMock.listenToEvent).toHaveBeenCalledWith(
          GameEventName.GAME_FOUND
        );
      });

      describe('when game is found', () => {
        let navigateSpy: SpyInstance;
        beforeEach(() => {
          navigateSpy = jest.spyOn(TestBed.inject(Router), 'navigateByUrl');
          navigateSpy.mockImplementation(() => {});

          listenSubject.next();
        });

        it('should redirect to game page', () => {
          expect(navigateSpy).toHaveBeenCalledWith('game');
        });
      });
    });
  });

  describe('cancelSearch', function() {
    it('should emit search cancel', () => {
      component.cancelSearch();
      expect(communicationServiceMock.sendEvent).toHaveBeenCalledWith(
        GameEventName.GAME_SEARCH_CANCEL
      );
    });

    it('should set searchOngoing to false', () => {
      component.isSearchOngoing = true;
      component.cancelSearch();

      expect(component.isSearchOngoing).toBe(false);
    });
  });
});
