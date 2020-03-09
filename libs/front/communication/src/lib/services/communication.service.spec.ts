import { CommunicationService } from './communication.service';
import { Subject } from 'rxjs';

describe('CommunicationService', () => {
  let communicationService: CommunicationService;
  let socket: any;

  beforeEach(() => {
    socket = { fromEvent: jest.fn(), emit: jest.fn() };
    communicationService = new CommunicationService(socket);
  });

  describe('sendEvent', () => {
    it('should forward event to socket', () => {
      communicationService.sendEvent('bla', { test: true });
      expect(socket.emit).toHaveBeenCalledWith('bla', { test: true });
    });
  });

  describe('listenToEvent', () => {
    it('should return observable from the socket', () => {
      const observable = new Subject<void>();
      socket.fromEvent.mockReturnValue(observable);

      const eventListener = communicationService.listenToEvent('name');

      expect(socket.fromEvent).toHaveBeenCalledWith('name');
      expect(eventListener).toBe(observable);
    });
  });
});
