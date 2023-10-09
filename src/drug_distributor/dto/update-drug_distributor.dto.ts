import { ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { IsBoolean, IsOptional, IsString } from 'class-validator';
import { BaseDTO } from 'src/common/base.dto';

export class UpdateDrugDistributorDto extends PartialType(BaseDTO) {

    
    @ApiPropertyOptional()
    @IsOptional()
    @IsString()
    distributorId: string;

    @ApiPropertyOptional()
    @IsOptional()
    @IsString()
    drugId: string;

    @ApiPropertyOptional()
    @IsOptional()
    @IsString()
    type: string; // Shall be an enum...!

    @ApiPropertyOptional()
    @IsOptional()
    @IsBoolean()
    is_preferred: Boolean;

}
