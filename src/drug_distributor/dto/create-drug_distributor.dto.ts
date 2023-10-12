import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';
import { BaseDTO } from 'src/common/base.dto';

export class CreateDrugDistributorDto extends PartialType(BaseDTO) {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  distributorId: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  drugId: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  type: string; // Shall be an enum...!

  @ApiProperty()
  @IsNotEmpty()
  @IsBoolean()
  is_preferred: Boolean;
}
