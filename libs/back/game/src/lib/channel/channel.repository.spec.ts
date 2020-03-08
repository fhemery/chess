import { ChannelRepository } from './channel.repository';
import { Socket } from 'socket.io';

describe('ChannelRepository', () => {
  let channelRepository: ChannelRepository;

  beforeEach(() => {
    channelRepository = new ChannelRepository();
  });

  it('should create', () => {
    expect(channelRepository).toBeTruthy();
  });

  describe('registerSocket and sendEvent', () => {
    it('should register socket for later emission', () => {
      const socketMock = ({ emit: jest.fn() } as unknown) as Socket;
      channelRepository.registerSocket('123', socketMock);
      channelRepository.sendEvent('123', { event: 'hi' });
      expect(socketMock.emit).toHaveBeenCalledWith('hi', undefined);
    });
  });

  describe('getUserIdFromSocketId', () => {
    it('should return the correct user id', () => {
      const socket = { id: 'abc' } as Socket;
      channelRepository.registerSocket('123', socket);

      const result = channelRepository.getUserIdFromSocketId('abc');

      expect(result).toBe('123');
    })
  })
});
