import { CreateDistributorDto } from './dto/create-distributor.dto';
import { Body, Controller, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { DistributorService } from './distributor.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { UpdateDistributorDto } from './dto/update-distributor.dto';

@ApiTags('distributor')
@Controller('distributor')
export class DistributorController {
  constructor(private readonly distributorService: DistributorService) {}

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() CreateDistributorDto: CreateDistributorDto){
    return await this.distributorService.create(CreateDistributorDto);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get()
  findAll() {
    return this.distributorService.findAll();
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.distributorService.findOneById(id);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDrugDistributorDto: UpdateDistributorDto){
    return this.distributorService.update(id, updateDrugDistributorDto);
  }
}
