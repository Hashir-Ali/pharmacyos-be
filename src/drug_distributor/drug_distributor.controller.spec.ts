import { Test, TestingModule } from '@nestjs/testing';
import { DrugDistributorController } from './drug_distributor.controller';
import { DrugDistributorService } from './drug_distributor.service';

describe('DrugDistributorController', () => {
  let controller: DrugDistributorController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DrugDistributorController],
      providers: [DrugDistributorService],
    }).compile();

    controller = module.get<DrugDistributorController>(DrugDistributorController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
