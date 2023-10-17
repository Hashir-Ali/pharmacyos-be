import { ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';
import { BaseDTO } from 'src/common/base.dto';
export class UpdateDrugDispenseDto extends PartialType(BaseDTO) {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  drugDispense: String;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  quantity?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  dispenseValue?: String;
}
