import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsBoolean, IsDate, IsDateString, IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateDrugOrderDto {

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
