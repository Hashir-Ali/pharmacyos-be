import { ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { BaseDTO } from 'src/common/base.dto';
import { IsOptional, IsString } from 'class-validator';

export class UpdateIssueTypeDto extends PartialType(BaseDTO) {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  issue_type: string;
}
