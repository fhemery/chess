import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';

describe('UserService', () => {
  let service: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserService]
    }).compile();

    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('register', () => {
    it('should generate a random id for user', () => {
      const result = service.register('Bob');
      expect(result.name).toBe('Bob');
      expect(result.id).toBeTruthy();
    });
  });

  describe('checkByName', () => {
    it('should return false for an unknown user', () => {
      expect(service.checkByName('Raph')).toBe(false);
    });

    it('should return true for a user already in the map', () => {
      service.register('Bob');
      expect(service.checkByName('Bob')).toBe(true);
    });
  });

  describe('checkById', () => {
    it('should return false for an unknown user', () => {
      expect(service.checkById('123')).toBe(false);
    });

    it('should return true for a user already in the map', () => {
      const user = service.register('Bob');
      expect(service.checkById(user.id)).toBe(true);
    });
  });
});
