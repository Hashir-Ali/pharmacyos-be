import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { StockService } from './stock.service';
import { CreateStockDto } from './dto/create-stock.dto';
import { UpdateStockDto } from './dto/update-stock.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@ApiTags('stock')
@Controller('stock')
export class StockController {
  constructor(private readonly stockService: StockService) {}

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createStockDto: CreateStockDto) {
    return this.stockService.create(createStockDto);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get()
  findAll() {
    return this.stockService.findAll();
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.stockService.findOne(id);
  }
}
