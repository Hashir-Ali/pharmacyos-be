import { CreateDrugOrderDto } from './dto/create-drug_order.dto';
import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { DrugOrderService } from './drug_order.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@ApiTags('drug-order')
@Controller('drug-order')
export class DrugOrderController {
  constructor(private readonly drugOrderService: DrugOrderService) {}

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() CreateDrugOrderDto: CreateDrugOrderDto){
    return await this.drugOrderService.create(CreateDrugOrderDto);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get()
  findAll() {
    return this.drugOrderService.findAll();
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.drugOrderService.findOne(id);
  }
}
