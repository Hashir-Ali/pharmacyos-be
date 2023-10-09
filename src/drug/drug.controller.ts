import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { DrugService } from './drug.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CreateDrugDto } from './dto/create-drug.dto';

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
  findAll() {
    return this.drugService.findAll();
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.drugService.findOne(id);
  }
}