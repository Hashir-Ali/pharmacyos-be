import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { DrugDispenseService } from './drug_dispense.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@ApiTags('drug-dispense')
@Controller('drug-dispense')
export class DrugDispenseController {
  constructor(private readonly drugDispenseService: DrugDispenseService) {}

  // @Post()
  // create(@Body() createDrugDispenseDto: CreateDrugDispenseDto) {
  //   return this.drugDispenseService.create(createDrugDispenseDto);
  // }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get()
  findAll() {
    return this.drugDispenseService.findAll();
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.drugDispenseService.findOne(id);
  }
}
