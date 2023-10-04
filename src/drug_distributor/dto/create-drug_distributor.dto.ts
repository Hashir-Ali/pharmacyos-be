import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsDateString, IsNotEmpty, IsString } from "class-validator";

export class CreateDrugDistributorDto {

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    distributorId: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    drugId: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    type: string; // Shall be an enum...!

    @ApiProperty()
    @IsNotEmpty()
    @IsBoolean()
    is_preferred: Boolean;
    

    @ApiProperty()
    @IsNotEmpty()
    @IsDateString()
    created_at: Date;

    @ApiProperty()
    @IsNotEmpty()
    @IsDateString()
    updated_at: Date;


}
