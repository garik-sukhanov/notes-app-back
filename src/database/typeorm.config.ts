import { DataSourceOptions } from 'typeorm';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as dotenv from 'dotenv';

dotenv.config();

const PORT = process.env.POSTGRES_PORT ? +process.env.POSTGRES_PORT : 5432;

export function buildTypeOrmOptions(): TypeOrmModuleOptions {
  return {
    type: 'postgres',
    host: process.env.POSTGRES_HOST ?? 'postgres',
    port: PORT,
    username: process.env.POSTGRES_USER ?? 'postgres',
    password: process.env.POSTGRES_PASSWORD ?? '0000',
    database: process.env.POSTGRES_DB ?? 'postgres_db',
    autoLoadEntities: true,
    synchronize: process.env.NODE_ENV !== 'production',
  };
}

export function buildDataSourceOptions(): DataSourceOptions {
  return {
    type: 'postgres',
    host: process.env.POSTGRES_HOST ?? 'postgres',
    port: PORT,
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
    entities: [__dirname + '/../**/*.entity.{ts,js}'],
    migrations: [__dirname + '/migrations/*.{ts,js}'],
    synchronize: process.env.NODE_ENV !== 'production',
  };
}
