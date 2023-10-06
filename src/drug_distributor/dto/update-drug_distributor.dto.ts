import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsBoolean, IsDate, IsDateString, IsOptional, IsString } from 'class-validator';

export class UpdateDrugDistributorDto{

    
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
    
    @ApiPropertyOptional()
    @IsOptional()
    @IsDateString()
    created_at: Date;

    @ApiPropertyOptional()
    @IsOptional()
    @IsDateString()
    updated_at: Date;

}
