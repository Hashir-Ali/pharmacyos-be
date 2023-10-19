import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { DrugService } from './drug.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CreateDrugDto } from './dto/create-drug.dto';

export enum SortOrder {
  ascending = 'ASC',
  descending = 'DESC',
}
@ApiTags('drug')
@Controller('drug')
export class DrugController {
  constructor(private readonly drugService: DrugService) {}

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createDrugDto: CreateDrugDto) {
    return this.drugService.create(createDrugDto);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get()
  findAll(
    @Query('page') page: string,
    @Query('limit') limit: string,
    @Query('sort') sort: SortOrder,
    @Query() filters: any,
  ) {
    return this.drugService.findFiltered(page, limit, sort, filters);
  }

  // @ApiBearerAuth()
  // @UseGuards(JwtAuthGuard)
  @Get('/searchDrugs')
  searchDrugs(@Query() filters: any) {
    return this.drugService.findFilter(filters);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.drugService.findOne(id);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get(':drugId/orders')
  findOrders(@Param('drugId') drugId: string) {
    return this.drugService.findDrugOrders(drugId);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get(':drugId/distributors')
  findDistributors(@Param('drugId') drugId: string) {
    return this.drugService.findDrugDistributors(drugId);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get(':drugId/stock')
  findStock(@Param('drugId') drugId: string) {
    return this.drugService.findDrugStock(drugId);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get(':drugId/stockLevels')
  findStockLevels(@Param('drugId') drugId: string) {
    return this.drugService.monthlyStockLevels(drugId);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get(':drugId/reporting')
  async findDrugDistributors(@Param('drugId') drugId: string) {
    return this.drugService.drugReporting(drugId);
  }
}
