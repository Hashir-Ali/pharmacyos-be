import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class UpdateUserDto{
    @ApiPropertyOptional()
    @IsOptional()
    @IsString()
    first_name: string;

    @ApiPropertyOptional()
    @IsOptional()
    @IsString()
    last_name: string;

    @ApiPropertyOptional()
    @IsOptional()
    @IsString()
    password: string;
}