import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { BaseDTO } from 'src/common/base.dto';

export class CreateStockDto extends PartialType(BaseDTO) {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  drugId: String;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  stockRuleMin: Number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  stockRuleMax: Number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  LooseUnits: Number;
}
