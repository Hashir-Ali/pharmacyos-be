import { Test, TestingModule } from '@nestjs/testing';
import { IssueTypesController } from './issue-types.controller';
import { IssueTypesService } from './issue-types.service';

describe('IssueTypesController', () => {
  let controller: IssueTypesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [IssueTypesController],
      providers: [IssueTypesService],
    }).compile();

    controller = module.get<IssueTypesController>(IssueTypesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
