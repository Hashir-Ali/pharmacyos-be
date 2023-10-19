import { ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';
import { IssueProgress } from '../entities/issue.entity';
import { BaseDTO } from 'src/common/base.dto';

export class UpdateIssueDto extends PartialType(BaseDTO) {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  progress: IssueProgress;
}
