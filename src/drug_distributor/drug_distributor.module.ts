import { Module, forwardRef } from '@nestjs/common';
import { DrugDistributorService } from './drug_distributor.service';
import { DrugDistributorController } from './drug_distributor.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DrugDistributor } from './entities/drug_distributor.entity';
import { DrugModule } from 'src/drug/drug.module';
import { DistributorModule } from 'src/distributor/distributor.module';

@Module({
  imports: [TypeOrmModule.forFeature([DrugDistributor]), forwardRef(()=>DrugModule), DistributorModule],
  controllers: [DrugDistributorController],
  providers: [DrugDistributorService],
  exports: [DrugDistributorService]
})
export class DrugDistributorModule {}
