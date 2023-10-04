import { Test, TestingModule } from '@nestjs/testing';
import { DrugOrderController } from './drug_order.controller';
import { DrugOrderService } from './drug_order.service';

describe('DrugOrderController', () => {
  let controller: DrugOrderController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DrugOrderController],
      providers: [DrugOrderService],
    }).compile();

    controller = module.get<DrugOrderController>(DrugOrderController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
