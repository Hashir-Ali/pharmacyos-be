import { ApiProperty, ApiPropertyOptional, PartialType } from "@nestjs/swagger";
import { IsNumber, IsOptional, IsString } from "class-validator";
import { BaseDTO } from "src/common/base.dto";

export class UpdateDrugDto extends PartialType(BaseDTO) {

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
}
