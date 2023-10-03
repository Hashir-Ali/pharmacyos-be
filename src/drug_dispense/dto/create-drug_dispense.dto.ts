import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsBoolean, IsDate, IsNotEmpty, IsString } from "class-validator";
import { Column, PrimaryGeneratedColumn } from "typeorm";

export class CreateDrugDispenseDto {
   
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    drugId: String;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    quantity: String;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    dispenseValue: String;

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
