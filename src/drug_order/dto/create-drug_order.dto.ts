import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsDate, IsDateString, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateDrugOrderDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    supplierId: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    drugId: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    ordered_by: string; // user Id....!

    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    quantityOrdered: Number;

    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    quantityReceived: Number;

    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    cost: number;

    @ApiProperty()
    @IsNotEmpty()
    @IsBoolean()
    isReceived: Boolean;

    @ApiProperty()
    @IsNotEmpty()
    @IsDateString()
    expected_delivery_date: Date;

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
