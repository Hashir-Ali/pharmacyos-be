import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsBoolean, IsDateString, IsOptional, IsString } from 'class-validator';

export class UpdateDistributorDto {
    @ApiPropertyOptional()
    @IsOptional()
    @IsString()
    name: string;

    @ApiPropertyOptional()
    @IsOptional()
    @IsString()
    NHS_Contract_End_Date: Date;

    @ApiPropertyOptional()
    @IsOptional()
    @IsDateString()
    created_at: Date;

    @ApiPropertyOptional()
    @IsOptional()
    @IsDateString()
    updated_at: Date;

    @ApiPropertyOptional()
    @IsOptional()
    @IsBoolean()
    is_enabled: Boolean;

}
