import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { DrugDispenseService } from './drug_dispense.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CreateDrugDispenseDto } from './dto/create-drug_dispense.dto';
import { SortOrder } from 'src/drug/drug.controller';

@ApiTags('drug-dispense')
@Controller('drug-dispense')
export class DrugDispenseController {
  constructor(private readonly drugDispenseService: DrugDispenseService) {}

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createDrugDispenseDto: CreateDrugDispenseDto) {
    return this.drugDispenseService.create(createDrugDispenseDto);
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
    return this.drugDispenseService.findAll(page, limit, sort, filters);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.drugDispenseService.findOne(id);
  }
}
