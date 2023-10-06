import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsBoolean, IsDateString, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateDrugDto {
    @ApiProperty()
    @IsString()
    name: string;

    @ApiProperty()
    @IsNumber()
    dosage: Number;

    @ApiProperty()
    @IsString()
    dosageUnit: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    dosageForm: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    BNFCode: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    fullDescription: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    containerSize: Number;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    location: string;

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
