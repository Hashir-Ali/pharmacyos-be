import { Module } from '@nestjs/common';
import { DistributorService } from './distributor.service';
import { DistributorController } from './distributor.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Distributor } from './entities/distributor.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Distributor])],
  controllers: [DistributorController],
  providers: [DistributorService],
  exports: [DistributorService]
})
export class DistributorModule {}
