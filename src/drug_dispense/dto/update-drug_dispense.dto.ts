import { ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { CreateDrugDispenseDto } from './create-drug_dispense.dto';
import { IsDate, IsNotEmpty, IsOptional, IsString } from 'class-validator';

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
    @IsDate()
    created_at?: Date;

    @ApiPropertyOptional()
    @IsOptional()
    @IsDate()
    updated_at?: Date;

    @ApiPropertyOptional()
    @IsOptional()
    @IsString()
    is_enabled?: Boolean;


}
