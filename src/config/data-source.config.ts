import { DataSource, DataSourceOptions } from 'typeorm';
import 'dotenv/config';

export const dataSourceConfig: DataSourceOptions = {
  type: 'postgres',
  host: process.env.TYPEORM_HOST || 'postgres',
  port: +process.env.TYPEORM_PORT || 5432,
  username: process.env.TYPEORM_USERNAME || 'user',
  password: process.env.TYPEORM_PASSWORD || 'password',
  database: process.env.TYPEORM_DATABASE || 'database',
  entities: ['dist/**/*.entity{.ts,.js}'],
  synchronize: process.env.NODE_ENV === 'development',
  logging: ['query', 'error', 'schema', 'warn', 'info', 'log'],
  migrations: ['dist/migrations/*{.ts,.js}'],
  migrationsTableName:
    process.env.TYPEORM_MIGRATIONS_TABLE_NAME || 'migrations',
  migrationsRun: process.env.NODE_ENV !== 'development',
};

const dataSource = new DataSource(dataSourceConfig);

export default dataSource;
