import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsBoolean, IsDate, IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateDrugOrderDto {

    @ApiPropertyOptional()
    @IsOptional()
    @IsString()
    supplierId: String;

    @ApiPropertyOptional()
    @IsOptional()
    @IsString()
    drugId: String;

    
    @ApiPropertyOptional()
    @IsOptional()
    @IsString()
    ordered_by: String;

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
    @IsDate()
    expected_delivery_date: Date;

    @ApiPropertyOptional()
    @IsOptional()
    @IsDate()
    created_at: Date;

    @ApiPropertyOptional()
    @IsOptional()
    @IsDate()
    updated_at: Date;

    @ApiPropertyOptional()
    @IsOptional()
    @IsBoolean()
    is_enabled: Boolean;
}
