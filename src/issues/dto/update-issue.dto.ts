import { ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { IsArray, IsOptional } from 'class-validator';
import { IssueProgress } from '../entities/issue.entity';
import { BaseDTO } from 'src/common/base.dto';

export class UpdateIssueDto extends PartialType(BaseDTO) {
  @ApiPropertyOptional()
  @IsOptional()
  progress: IssueProgress;

  @ApiPropertyOptional()
  @IsOptional()
  @IsArray()
  notes: string[];
}
