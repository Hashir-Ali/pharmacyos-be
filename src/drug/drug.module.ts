import { Module, forwardRef } from '@nestjs/common';
import { DrugService } from './drug.service';
import { DrugController } from './drug.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Drug } from './entities/drug.entity';
import { DrugOrderModule } from 'src/drug_order/drug_order.module';
import { DrugDistributorModule } from 'src/drug_distributor/drug_distributor.module';
import { DistributorModule } from 'src/distributor/distributor.module';
import { StockModule } from 'src/stock/stock.module';
import { DrugDispenseModule } from 'src/drug_dispense/drug_dispense.module';

@Module({
  imports: [TypeOrmModule.forFeature([Drug]), DrugOrderModule, DrugDistributorModule, DistributorModule, StockModule, DrugDispenseModule],
  controllers: [DrugController],
  providers: [DrugService],
  exports: [DrugService],
})
export class DrugModule {}
