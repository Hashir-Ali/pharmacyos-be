import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsDate, IsDateString, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateStockDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    drugId: String;

    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    stockRuleMin: Number;

    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    stockRuleMax: Number;

    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    LooseUnits: Number;

    @ApiProperty()
    @IsNotEmpty()
    @IsDateString()
    created_at: Date;

    @ApiProperty()
    @IsNotEmpty()
    @IsDateString()
    updated_at: Date;

    @ApiProperty()
    @IsNotEmpty()
    @IsBoolean()
    is_enabled: Boolean;
}
