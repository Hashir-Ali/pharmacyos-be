import { CreateDistributorDto } from './dto/create-distributor.dto';
import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { DistributorService } from './distributor.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

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
  findOne(@Param('id') id: string) {
    return this.distributorService.findOne(id);
  }
}
