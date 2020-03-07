import { ChannelService } from './channel.service';

describe('channelService', () => {
  let channelService: ChannelService;
  let channelRepository: any;

  beforeEach(() => {
    channelRepository = {
      registerSocket: jest.fn(),
      sendEvent: jest.fn()
    };
    channelService = new ChannelService(channelRepository);
  });

  it('should create', () => {
    expect(channelService).toBeTruthy();
  });

  describe('authenticate', () => {
    it('should register to the repository', () => {
      channelService.authenticate('123', null);
      expect(channelRepository.registerSocket).toHaveBeenCalled();
    });

    it('should emit auth:ok event', () => {
      channelService.authenticate('123', null);
      expect(channelRepository.sendEvent).toHaveBeenCalledWith('123', {
        event: 'auth:ok'
      });
    });
  });

  describe('sendEvent', () => {
    it('should call the repository', () => {
      const eventToSend = { event: 'test', data: null };
      channelService.sendEvent('123', eventToSend);
      expect(channelRepository.sendEvent).toHaveBeenCalledWith(
        '123',
        eventToSend
      );
    });
  });
});
