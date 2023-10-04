import { Module } from '@nestjs/common';
import { DrugDistributorService } from './drug_distributor.service';
import { DrugDistributorController } from './drug_distributor.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DrugDistributor } from './entities/drug_distributor.entity';

@Module({
  imports: [TypeOrmModule.forFeature([DrugDistributor])],
  controllers: [DrugDistributorController],
  providers: [DrugDistributorService],
  exports: [DrugDistributorService]
})
export class DrugDistributorModule {}
