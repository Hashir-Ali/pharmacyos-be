import { ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { CreateIssueTypeDto } from './create-issue-type.dto';
import { BaseDTO } from 'src/common/base.dto';
import { IsOptional, IsString } from 'class-validator';

export class UpdateIssueTypeDto extends PartialType(BaseDTO) {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  issue_type: string;
}
