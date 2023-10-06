import { Test, TestingModule } from '@nestjs/testing';
import { DrugDistributorService } from './drug_distributor.service';

describe('DrugDistributorService', () => {
  let service: DrugDistributorService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DrugDistributorService],
    }).compile();

    service = module.get<DrugDistributorService>(DrugDistributorService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
