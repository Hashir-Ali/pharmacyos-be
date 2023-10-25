import { CreateDrugDistributorDto } from './dto/create-drug_distributor.dto';
import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { DrugDistributorService } from './drug_distributor.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { SortOrder } from 'src/drug/drug.controller';

@ApiTags('drug-distributor')
@Controller('drug-distributor')
export class DrugDistributorController {
  constructor(
    private readonly drugDistributorService: DrugDistributorService,
  ) {}

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() CreateDrugDistributorDto: CreateDrugDistributorDto) {
    return await this.drugDistributorService.create(CreateDrugDistributorDto);
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
    return this.drugDistributorService.findAll(page, limit, sort, filters);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get(':drugId')
  findOne(@Param('drugId') drugId: string) {
    return this.drugDistributorService.findOne(drugId);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get(':id/:type')
  updateMany(@Param('id') id: string, @Param('type') type: string) {
    return this.drugDistributorService.updateAllDistributorTypes(id, type);
  }
}
