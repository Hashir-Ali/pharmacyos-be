import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsDate, IsNotEmpty, IsString } from "class-validator";

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
    @IsDate()
    created_at: Date;

    @ApiProperty()
    @IsNotEmpty()
    @IsDate()
    updated_at: Date;


}
