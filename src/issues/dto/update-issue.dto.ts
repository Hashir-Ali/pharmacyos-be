import { ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { CreateIssueDto } from './create-issue.dto';
import {
  IsArray,
  IsBoolean,
  IsDate,
  IsOptional,
  IsString,
} from 'class-validator';
import { ObjectId } from 'mongodb';
import { IssueProgress, IssueTypes } from '../entities/issue.entity';

export class UpdateIssueDto extends PartialType(CreateIssueDto) {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  drugId: ObjectId | string;

  @ApiPropertyOptional()
  @IsOptional()
  issue_type: IssueTypes[];

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  description: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsDate()
  due_date: Date;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  created_by: ObjectId | string;

  @ApiPropertyOptional()
  @IsOptional()
  progress: IssueProgress;

  @ApiPropertyOptional()
  @IsOptional()
  @IsArray()
  notes: string[];

  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean()
  is_closed: boolean;
}
