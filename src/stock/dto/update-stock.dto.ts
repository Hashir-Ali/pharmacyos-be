import { ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { CreateStockDto } from './create-stock.dto';
import { IsBoolean, IsDate, IsDateString, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateStockDto extends PartialType(CreateStockDto) {
    @ApiPropertyOptional()
    @IsOptional()
    @IsString()
    drugId: String;
    
    @ApiPropertyOptional()
    @IsOptional()
    @IsNumber()
    stockRuleMin?: Number;

    @ApiPropertyOptional()
    @IsOptional()
    @IsNumber()
    stockRuleMax?: Number;

    @ApiPropertyOptional()
    @IsOptional()
    @IsNumber()
    LooseUnits: Number;

    @ApiPropertyOptional()
    @IsOptional()
    @IsDateString()
    created_at?: Date;

    @ApiPropertyOptional()
    @IsOptional()
    @IsDateString()
    updated_at?: Date;

    @ApiPropertyOptional()
    @IsOptional()
    @IsBoolean()
    is_enabled?: Boolean;
}
