import { ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';
import { BaseDTO } from 'src/common/base.dto';

export class UpdateStockDto extends PartialType(BaseDTO) {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  drugId: String;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  stockRuleMin?: Number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  stockRuleMax?: Number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  LooseUnits: Number;
}
