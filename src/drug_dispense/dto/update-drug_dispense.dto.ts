import { ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { CreateDrugDispenseDto } from './create-drug_dispense.dto';
import { IsBoolean, IsDateString, IsOptional, IsString } from 'class-validator';

export class UpdateDrugDispenseDto extends PartialType(CreateDrugDispenseDto) {

    @ApiPropertyOptional()
    @IsOptional()
    @IsString()
    drugDispense: String;

    @ApiPropertyOptional()
    @IsOptional()
    @IsString()
    quantity?: String;

    @ApiPropertyOptional()
    @IsOptional()
    @IsString()
    dispenseValue?: String;

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
