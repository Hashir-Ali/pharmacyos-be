import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsDateString, IsNotEmpty, IsString } from "class-validator";

export class CreateDrugDistributorDto {

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    distributorId: String;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    drugId: String;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    type: String; // Shall be an enum...!

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
