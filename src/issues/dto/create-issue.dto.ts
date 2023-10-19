import { ApiProperty, PartialType } from '@nestjs/swagger';
import {
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsObject,
  IsString,
  ValidateNested,
} from 'class-validator';
import { ObjectId } from 'mongodb';
import { BaseDTO } from 'src/common/base.dto';
import { IssueProgress, IssueTypes } from '../entities/issue.entity';
import { Note } from 'src/notes/entities/note.entity';
import { CreateNoteDto } from 'src/notes/dto/create-note.dto';

export class CreateIssueDto extends PartialType(BaseDTO) {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  drugId: ObjectId | string;

  @ApiProperty({ enum: IssueTypes, required: true })
  @IsNotEmpty()
  @IsEnum(IssueTypes)
  issue_type: IssueTypes;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  description: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsDateString()
  due_date: Date;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  created_by: ObjectId | string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  assigned_to: ObjectId | string;

  @ApiProperty()
  @IsNotEmpty()
  progress: IssueProgress;

  @ApiProperty()
  @IsNotEmpty()
  note: string;
}
