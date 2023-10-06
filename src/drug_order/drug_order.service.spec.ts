import { Test, TestingModule } from '@nestjs/testing';
import { DrugOrderService } from './drug_order.service';

describe('DrugOrderService', () => {
  let service: DrugOrderService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DrugOrderService],
    }).compile();

    service = module.get<DrugOrderService>(DrugOrderService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
