import { Module } from '@nestjs/common';
import { DrugOrderService } from './drug_order.service';
import { DrugOrderController } from './drug_order.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DrugOrder } from './entities/drug_order.entity';

@Module({
  imports: [TypeOrmModule.forFeature([DrugOrder])],
  controllers: [DrugOrderController],
  providers: [DrugOrderService],
})
export class DrugOrderModule {}
