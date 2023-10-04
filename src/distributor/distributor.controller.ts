import { Controller, Get, Param } from '@nestjs/common';
import { DistributorService } from './distributor.service';

@Controller('distributor')
export class DistributorController {
  constructor(private readonly distributorService: DistributorService) {}

  @Get()
  findAll() {
    return this.distributorService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.distributorService.findOne(id);
  }
}
