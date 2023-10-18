import { ApiProperty, PartialType } from '@nestjs/swagger';
import {
  IsArray,
  IsBoolean,
  IsDate,
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsString,
} from 'class-validator';
import { ObjectId } from 'mongodb';
import { BaseDTO } from 'src/common/base.dto';
import { IssueProgress, IssueTypes } from '../entities/issue.entity';

export class CreateIssueDto extends PartialType(BaseDTO) {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  drugId: ObjectId | string;

  @ApiProperty({ enum: IssueTypes, required: true })
  @IsNotEmpty()
  @IsEnum(IssueTypes)
  issue_type: IssueTypes[];

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
  progress: IssueProgress;

  @ApiProperty()
  @IsNotEmpty()
  @IsArray()
  notes: string[];

  @ApiProperty()
  @IsNotEmpty()
  @IsBoolean()
  is_closed: boolean;
}
