import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { DrugDistributorService } from './drug_distributor.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@ApiTags('drug-distributor')
@Controller('drug-distributor')
export class DrugDistributorController {
  constructor(private readonly drugDistributorService: DrugDistributorService) {}

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get()
  findAll() {
    return this.drugDistributorService.findAll();
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.drugDistributorService.findOne(id);
  }

}
