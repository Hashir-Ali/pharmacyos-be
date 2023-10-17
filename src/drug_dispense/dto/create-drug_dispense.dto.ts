import { ObjectId } from 'mongodb';
import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { BaseDTO } from 'src/common/base.dto';

export class CreateDrugDispenseDto extends PartialType(BaseDTO) {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  drugId: ObjectId | string;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  quantity: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  dispenseValue: String;
}
