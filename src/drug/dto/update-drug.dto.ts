import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsBoolean, IsDateString, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class UpdateDrugDto {

    @ApiPropertyOptional()
    @IsOptional()
    @IsString()
    name: string;

    @ApiPropertyOptional()
    @IsOptional()
    @IsNumber()
    dosage: Number;

    @ApiProperty()
    @IsOptional()
    @IsString()
    dosageUnit: string;

    @ApiPropertyOptional()
    @IsOptional()
    @IsString()
    dosageForm: string;

    @ApiProperty()
    @IsOptional()
    @IsString()
    BNFCode: string;

    @ApiPropertyOptional()
    @IsOptional()
    @IsString()
    fullDescription: string;

    @ApiPropertyOptional()
    @IsOptional()
    @IsNumber()
    containerSize: Number;

    @ApiPropertyOptional()
    @IsOptional()
    @IsString()
    location: string;

    @ApiPropertyOptional()
    @IsOptional()
    @IsNumber()
    drugEAN: Number;

    @ApiPropertyOptional()
    @IsOptional()
    @IsDateString()
    created_at: Date;

    @ApiPropertyOptional()
    @IsOptional()
    @IsDateString()
    updated_at: Date;

    @ApiProperty()
    @IsNotEmpty()
    @IsBoolean()
    is_enabled: Boolean;
}
