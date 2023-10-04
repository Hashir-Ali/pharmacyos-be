import { Module } from '@nestjs/common';
import { DrugOrderService } from './drug_order.service';
import { DrugOrderController } from './drug_order.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DrugOrder } from './entities/drug_order.entity';
import { DistributorModule } from 'src/distributor/distributor.module';
import { UsersModule } from 'src/users/users.module';
import { DrugDistributorModule } from 'src/drug_distributor/drug_distributor.module';

@Module({
  imports: [TypeOrmModule.forFeature([DrugOrder]), UsersModule, DistributorModule, DrugDistributorModule],
  controllers: [DrugOrderController],
  providers: [DrugOrderService],
})
export class DrugOrderModule {}
