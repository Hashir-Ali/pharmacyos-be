import { ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';
import { BaseDTO } from 'src/common/base.dto';

export class UpdateDistributorDto extends PartialType(BaseDTO) {
    @ApiPropertyOptional()
    @IsOptional()
    @IsString()
    name: string;

    @ApiPropertyOptional()
    @IsOptional()
    @IsString()
    NHS_Contract_End_Date: Date;

}
