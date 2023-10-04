import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsBoolean, IsDate, IsOptional, IsString } from 'class-validator';

export class UpdateDrugDistributorDto{

    
    @ApiPropertyOptional()
    @IsOptional()
    @IsString()
    distributorId: String;

    @ApiPropertyOptional()
    @IsOptional()
    @IsString()
    drugId: String;

    @ApiPropertyOptional()
    @IsOptional()
    @IsString()
    type: String; // Shall be an enum...!

    @ApiPropertyOptional()
    @IsOptional()
    @IsBoolean()
    is_preferred: Boolean;
    

    @ApiPropertyOptional()
    @IsOptional()
    @IsDate()
    created_at: Date;

    @ApiPropertyOptional()
    @IsOptional()
    @IsDate()
    updated_at: Date;

}
