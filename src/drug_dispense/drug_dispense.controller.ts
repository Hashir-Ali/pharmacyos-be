import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DrugDispenseService } from './drug_dispense.service';
import { CreateDrugDispenseDto } from './dto/create-drug_dispense.dto';
import { UpdateDrugDispenseDto } from './dto/update-drug_dispense.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('drug-dispense')
@Controller('drug-dispense')
export class DrugDispenseController {
  constructor(private readonly drugDispenseService: DrugDispenseService) {}

  // @Post()
  // create(@Body() createDrugDispenseDto: CreateDrugDispenseDto) {
  //   return this.drugDispenseService.create(createDrugDispenseDto);
  // }

  @Get()
  findAll() {
    return this.drugDispenseService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.drugDispenseService.findOne(id);
  }
}
