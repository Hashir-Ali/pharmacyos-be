import { Module, forwardRef } from '@nestjs/common';
import { DrugService } from './drug.service';
import { DrugController } from './drug.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Drug } from './entities/drug.entity';
import { DrugOrderModule } from 'src/drug_order/drug_order.module';

@Module({
  imports: [TypeOrmModule.forFeature([Drug]), forwardRef(()=>DrugOrderModule)], // using forwardRef because of circular dependencies.
  controllers: [DrugController],
  providers: [DrugService],
  exports: [DrugService],
})
export class DrugModule {}
