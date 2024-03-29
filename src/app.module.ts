import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { DrugModule } from './drug/drug.module';
import { StockModule } from './stock/stock.module';
import { DrugDispenseModule } from './drug_dispense/drug_dispense.module';
import { DrugOrderModule } from './drug_order/drug_order.module';
import { DistributorModule } from './distributor/distributor.module';
import { DrugDistributorModule } from './drug_distributor/drug_distributor.module';
import { dataSourceOptions } from './database/database.constants';
import { IssuesModule } from './issues/issues.module';
import { NotesModule } from './notes/notes.module';
import { IssueTypesModule } from './issue-types/issue-types.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot(dataSourceOptions),
    AuthModule,
    UsersModule,
    DrugModule,
    StockModule,
    DrugDispenseModule,
    DrugOrderModule,
    DistributorModule,
    DrugDistributorModule,
    IssuesModule,
    NotesModule,
    IssueTypesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
