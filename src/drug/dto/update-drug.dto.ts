import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsBoolean, IsDateString, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class UpdateDrugDto {

    @ApiPropertyOptional()
    @IsOptional()
    @IsString()
    name: String;

    @ApiPropertyOptional()
    @IsOptional()
    @IsNumber()
    dosage: Number;

    @ApiProperty()
    @IsOptional()
    @IsString()
    dosageUnit: String;

    @ApiPropertyOptional()
    @IsOptional()
    @IsString()
    dosageForm: String;

    @ApiProperty()
    @IsOptional()
    @IsString()
    BNFCode: String;

    @ApiPropertyOptional()
    @IsOptional()
    @IsString()
    fullDescription: String;

    @ApiPropertyOptional()
    @IsOptional()
    @IsNumber()
    containerSize: Number;

    @ApiPropertyOptional()
    @IsOptional()
    @IsString()
    location: String;

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
