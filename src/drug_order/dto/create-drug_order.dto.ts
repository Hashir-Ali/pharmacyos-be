import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsDate, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateDrugOrderDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    supplierId: String;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    drugId: String;

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
    @IsDate()
    created_at: Date;

    @ApiProperty()
    @IsNotEmpty()
    @IsDate()
    updated_at: Date;

    @ApiProperty()
    @IsNotEmpty()
    @IsBoolean()
    is_enabled: Boolean;
}
