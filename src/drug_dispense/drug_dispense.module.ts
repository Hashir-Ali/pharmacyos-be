import { Module } from '@nestjs/common';
import { DrugDispenseService } from './drug_dispense.service';
import { DrugDispenseController } from './drug_dispense.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DrugDispense } from './entities/drug_dispense.entity';

@Module({
  imports: [TypeOrmModule.forFeature([DrugDispense])],
  controllers: [DrugDispenseController],
  providers: [DrugDispenseService],
  exports: [DrugDispenseService],
})
export class DrugDispenseModule {}