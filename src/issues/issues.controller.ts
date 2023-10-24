import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Request,
  UseGuards,
  Query,
} from '@nestjs/common';
import { IssuesService } from './issues.service';
import { CreateIssueDto } from './dto/create-issue.dto';
import { UpdateIssueDto } from './dto/update-issue.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Role } from 'src/common/role.enum';
import { Roles } from 'src/common/roles.decorator';

@ApiTags('Issues')
@Controller('issues')
export class IssuesController {
  constructor(private readonly issuesService: IssuesService) {}

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin)
  @Post()
  create(@Body() createIssueDto: CreateIssueDto) {
    return this.issuesService.create(createIssueDto);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get('inProgress')
  findAll(
    @Request() req,
    @Query('page') page: string,
    @Query('limit') limit: string,
    @Query('q') query: string,
    @Query('filters') filters: string[],
  ) {
    return this.issuesService.findAll(req.user, page, limit, query, filters);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get('/completed')
  findCompleted(
    @Request() req,
    @Query('page') page: string,
    @Query('limit') limit: string,
    @Query('q') query: string,
    @Query('filters') filters: string[],
  ) {
    return this.issuesService.findCompleted(
      req.user,
      page,
      limit,
      query,
      filters,
    );
  }

  @Get('/drug/:drugId')
  findDrugIssues() {}

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.issuesService.findOne(id);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(
    @Request() req,
    @Param('id') id: string,
    @Body() updateIssueDto: UpdateIssueDto,
  ) {
    return this.issuesService.update(id, updateIssueDto, req.user);
  }
}
