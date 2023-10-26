import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { BaseDTO } from 'src/common/base.dto';

export class CreateDrugDto extends PartialType(BaseDTO) {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsNumber()
  dosage: number;

  @ApiProperty()
  @IsString()
  dosageUnit: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  dosageForm: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  BNFCode: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  fullDescription: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  containerSize: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  location: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  drugEAN: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsBoolean()
  status: boolean;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  last_order: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  rule_type: string;
}
