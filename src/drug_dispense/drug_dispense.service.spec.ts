import { Test, TestingModule } from '@nestjs/testing';
import { DrugDispenseService } from './drug_dispense.service';

describe('DrugDispenseService', () => {
  let service: DrugDispenseService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DrugDispenseService],
    }).compile();

    service = module.get<DrugDispenseService>(DrugDispenseService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
