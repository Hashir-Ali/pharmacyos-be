import { Module, forwardRef } from '@nestjs/common';
import { DrugOrderService } from './drug_order.service';
import { DrugOrderController } from './drug_order.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DrugOrder } from './entities/drug_order.entity';
import { DistributorModule } from 'src/distributor/distributor.module';
import { UsersModule } from 'src/users/users.module';
import { DrugDistributorModule } from 'src/drug_distributor/drug_distributor.module';
import { DrugModule } from 'src/drug/drug.module';

@Module({
  imports: [TypeOrmModule.forFeature([DrugOrder]), UsersModule, DistributorModule, DrugDistributorModule, forwardRef(()=>DrugModule)], // using forwardRef because of circular dependecies..
  controllers: [DrugOrderController],
  providers: [DrugOrderService],
  exports: [DrugOrderService]
})
export class DrugOrderModule {}
