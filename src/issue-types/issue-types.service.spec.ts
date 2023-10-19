import { Test, TestingModule } from '@nestjs/testing';
import { IssueTypesService } from './issue-types.service';

describe('IssueTypesService', () => {
  let service: IssueTypesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [IssueTypesService],
    }).compile();

    service = module.get<IssueTypesService>(IssueTypesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
