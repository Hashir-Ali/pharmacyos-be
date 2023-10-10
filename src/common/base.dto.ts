import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsDateString, IsNotEmpty } from "class-validator";

export class BaseDTO {


    // @ApiProperty()
    // @IsNotEmpty()
    // @IsDateString()
    // created_at: Date;

    // @ApiProperty()
    // @IsNotEmpty()
    // @IsDateString()
    // updated_at: Date;

    // above is commented because populated at runtime...

    @ApiProperty()
    @IsNotEmpty()
    @IsBoolean()
    is_enabled: Boolean;
}