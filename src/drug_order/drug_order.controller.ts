import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DrugOrderService } from './drug_order.service';
import { CreateDrugOrderDto } from './dto/create-drug_order.dto';
import { UpdateDrugOrderDto } from './dto/update-drug_order.dto';

@Controller('drug-order')
export class DrugOrderController {
  constructor(private readonly drugOrderService: DrugOrderService) {}

  @Get()
  findAll() {
    return this.drugOrderService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.drugOrderService.findOne(id);
  }
}
