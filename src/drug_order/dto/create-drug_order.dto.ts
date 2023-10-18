import { ApiProperty, PartialType } from '@nestjs/swagger';
import {
  IsBoolean,
  IsDateString,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';
import { ObjectId } from 'mongodb';
import { BaseDTO } from 'src/common/base.dto';

export class CreateDrugOrderDto extends PartialType(BaseDTO) {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  supplierId: ObjectId | string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  drugId: ObjectId | string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  ordered_by: ObjectId | string; // user Id....!

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  quantityOrdered: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  quantityReceived: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  cost: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsBoolean()
  isReceived: Boolean;

  @ApiProperty()
  @IsNotEmpty()
  @IsDateString()
  expected_delivery_date: Date;
}
