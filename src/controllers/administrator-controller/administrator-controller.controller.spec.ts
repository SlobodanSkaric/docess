import { Test, TestingModule } from '@nestjs/testing';
import { AdministratorControllerController } from './administrator-controller.controller';

describe('AdministratorControllerController', () => {
  let controller: AdministratorControllerController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AdministratorControllerController],
    }).compile();

    controller = module.get<AdministratorControllerController>(AdministratorControllerController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
