import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';
import { ObjectId } from 'mongodb';
import { BaseDTO } from 'src/common/base.dto';

export class CreateDrugDistributorDto extends PartialType(BaseDTO) {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  distributorId: ObjectId | string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  drugId: ObjectId | string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  type: string; // Shall be an enum...!

  @ApiProperty()
  @IsNotEmpty()
  @IsBoolean()
  is_preferred: Boolean;
}
