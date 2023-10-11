import { CreateDrugDistributorDto } from './dto/create-drug_distributor.dto';
import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { DrugDistributorService } from './drug_distributor.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@ApiTags('drug-distributor')
@Controller('drug-distributor')
export class DrugDistributorController {
  constructor(private readonly drugDistributorService: DrugDistributorService) {}
  
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post()
  async create (@Body() CreateDrugDistributorDto: CreateDrugDistributorDto){
      return await this.drugDistributorService.create(CreateDrugDistributorDto);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get()
  findAll() {
    return this.drugDistributorService.findAll();
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get(':drugId')
  findOne(@Param('drugId') drugId: string) {
    return this.drugDistributorService.findOne(drugId);
  }

}
