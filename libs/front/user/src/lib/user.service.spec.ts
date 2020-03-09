import { UserService } from './user.service';
import { User } from '@chess/shared/types';

describe('UserService', () => {
  let service: UserService;
  let cookieServiceMock: any;
  let bobUser: User;

  beforeEach(() => {
    bobUser = { id: '123', name: 'bob' };
    cookieServiceMock = { set: jest.fn(), get: jest.fn() };
    service = new UserService(cookieServiceMock);
  });

  describe('setUser', () => {
    beforeEach(() => {
      service.setUser(bobUser);
    });

    it('should store user name for retrieval by getUser', () => {
      expect(service.getUser()).toEqual(bobUser);
    });

    it('should store info in a cookie', () => {
      expect(document.cookie.includes('bob')).toBe(true);
    });
  });

  describe('getUser', () => {
    it('should return user previously set if exist', () => {
      service.setUser(bobUser);
      expect(service.getUser()).toEqual(bobUser);
      expect(cookieServiceMock.get).not.toHaveBeenCalled();
    });

    it('should return user from cookie if not set during session', () => {
      cookieServiceMock.get.mockReturnValue(JSON.stringify(bobUser));
      expect(service.getUser()).toEqual(bobUser);
    });

    it('should return undefined if no cookie and no user set', () => {
      expect(service.getUser()).toBeUndefined();
    });
  });
});
