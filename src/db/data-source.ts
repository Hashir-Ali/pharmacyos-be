import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { SeederOptions } from 'typeorm-extension';

export const dataSourceOptions: TypeOrmModuleOptions & SeederOptions = {
    type: 'mongodb',
    url: process.env.DB_CONNECTION_URL,
    useNewUrlParser: true,
    synchronize: true, // shall be avoided in production...
    logging: true,
    autoLoadEntities: true,
    factories: ['dist/db/factories/**/*.js'],
    seeds: ['dist/db/seeds/**/*.js'],
}