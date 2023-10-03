import { Test, TestingModule } from '@nestjs/testing';
import { DrugDispenseController } from './drug_dispense.controller';
import { DrugDispenseService } from './drug_dispense.service';

describe('DrugDispenseController', () => {
  let controller: DrugDispenseController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DrugDispenseController],
      providers: [DrugDispenseService],
    }).compile();

    controller = module.get<DrugDispenseController>(DrugDispenseController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
