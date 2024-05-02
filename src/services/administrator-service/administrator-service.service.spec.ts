import { Test, TestingModule } from '@nestjs/testing';
import { AdministratorServiceService } from './administrator-service';

describe('AdministratorServiceService', () => {
  let service: AdministratorServiceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AdministratorServiceService],
    }).compile();

    service = module.get<AdministratorServiceService>(AdministratorServiceService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
