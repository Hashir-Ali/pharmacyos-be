import { ApiProperty} from "@nestjs/swagger";
import { IsBoolean, IsDateString, IsNotEmpty, IsString } from "class-validator";

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
