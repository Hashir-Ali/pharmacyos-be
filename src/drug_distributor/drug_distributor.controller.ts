import { Controller, Get, Param } from '@nestjs/common';
import { DrugDistributorService } from './drug_distributor.service';

@Controller('drug-distributor')
export class DrugDistributorController {
  constructor(private readonly drugDistributorService: DrugDistributorService) {}

  @Get()
  findAll() {
    return this.drugDistributorService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.drugDistributorService.findOne(id);
  }

}
