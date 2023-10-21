import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { ObjectId } from 'mongodb';
import { BaseDTO } from 'src/common/base.dto';
import { Issue } from 'src/issues/entities/issue.entity';

export class CreateNoteDto extends PartialType(BaseDTO) {
  @ApiProperty()
  @IsNotEmpty()
  issue: ObjectId | string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  note: string | null;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  created_by: ObjectId | string;
}
