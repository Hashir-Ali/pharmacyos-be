import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { ObjectId } from 'mongodb';
import { BaseDTO } from 'src/common/base.dto';

export class CreateStockDto extends PartialType(BaseDTO) {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  drugId: ObjectId | string;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  stockRuleMin: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  stockRuleMax: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  currentStock: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  LooseUnits: number;
}
