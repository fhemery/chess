import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';

describe('User Controller', () => {
  let controller: UserController;
  let service: any;

  beforeEach(async () => {
    service = { checkByName: jest.fn(), register: jest.fn() };
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [{provide: UserService, useValue: service}]
    }).compile();

    controller = module.get<UserController>(UserController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('register', () => {
    it ('should return an error if user is known', () => {
      service.checkByName.mockReturnValue(true);
      expect(() => controller.register('Bob')).toThrowError();
    });

    it('should return a new user if user is unknown', () => {
      service.checkByName.mockReturnValue(false);
      service.register.mockReturnValue({id: '123', name: 'Viktor'});

      const result = controller.register('Viktor');
      expect(result.id).toBe('123');
      expect(result.name).toBe('Viktor');
    });
  });
});
