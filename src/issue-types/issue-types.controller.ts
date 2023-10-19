import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { IssueTypesService } from './issue-types.service';
import { CreateIssueTypeDto } from './dto/create-issue-type.dto';
import { UpdateIssueTypeDto } from './dto/update-issue-type.dto';
import { ApiTags } from '@nestjs/swagger';
import { ObjectId } from 'mongodb';

@ApiTags('issue-types')
@Controller('issue-types')
export class IssueTypesController {
  constructor(private readonly issueTypesService: IssueTypesService) {}

  @Post()
  create(@Body() createIssueTypeDto: CreateIssueTypeDto) {
    return this.issueTypesService.create(createIssueTypeDto);
  }

  @Get()
  findAll() {
    return this.issueTypesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.issueTypesService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateIssueTypeDto: UpdateIssueTypeDto,
  ) {
    return this.issueTypesService.update(id, updateIssueTypeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.issueTypesService.remove(+id);
  }
}
