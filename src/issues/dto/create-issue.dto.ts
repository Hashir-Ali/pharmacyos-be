import { ApiProperty, PartialType } from '@nestjs/swagger';
import {
  IsDateString,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { ObjectId } from 'mongodb';
import { BaseDTO } from 'src/common/base.dto';
import { IssueProgress } from '../entities/issue.entity';

export class CreateIssueDto extends PartialType(BaseDTO) {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  drugId: ObjectId | string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  issue_type: ObjectId | string;

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
  @IsOptional()
  note: string | null;
}
