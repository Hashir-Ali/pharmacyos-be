import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsBoolean, IsDateString, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateDrugDto {
    @ApiProperty()
    @IsString()
    name: String;

    @ApiProperty()
    @IsNumber()
    dosage: Number;

    @ApiProperty()
    @IsString()
    dosageUnit: String;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    dosageForm: String;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    BNFCode: String;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    fullDescription: String;

    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    containerSize: Number;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    location: String;

    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    drugEAN: Number;

    @ApiProperty()
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
