import { ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import {
  IsBoolean,
  IsDateString,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { BaseDTO } from 'src/common/base.dto';

export class UpdateDrugOrderDto extends PartialType(BaseDTO) {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  supplierId: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  drugId: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  ordered_by: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  quantityOrdered: Number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  quantityReceived: Number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  cost: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean()
  isReceived: Boolean;

  @ApiPropertyOptional()
  @IsOptional()
  @IsDateString()
  expected_delivery_date: Date;
}
