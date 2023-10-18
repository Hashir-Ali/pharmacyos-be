import { ObjectId } from 'mongodb';
import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { BaseDTO } from 'src/common/base.dto';

export class CreateDrugDispenseDto extends PartialType(BaseDTO) {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  drugId: ObjectId | string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  quantity: String;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  dispenseValue: String;
}
