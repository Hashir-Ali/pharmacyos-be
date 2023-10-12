import { ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';
import { BaseDTO } from 'src/common/base.dto';
export class UpdateDrugDispenseDto extends PartialType(BaseDTO) {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  drugDispense: String;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  quantity?: String;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  dispenseValue?: String;
}
