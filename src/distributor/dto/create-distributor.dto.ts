import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsDate, IsNotEmpty, IsString } from "class-validator";

export class CreateDistributorDto {

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    name: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    NHS_Contract_End_Date: Date;

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
