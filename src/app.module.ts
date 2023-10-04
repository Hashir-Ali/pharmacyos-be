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

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'mongodb',
      url: process.env.DB_CONNECTION_URL,
      useNewUrlParser: true,
      synchronize: true, // shall be avoided in production...
      logging: true,
      autoLoadEntities: true,
    }),

    AuthModule,
    UsersModule,
    DrugModule,
    StockModule,
    DrugDispenseModule,
    DrugOrderModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
