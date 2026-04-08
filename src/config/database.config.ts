export default () => ({
  type: 'mysql',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT ?? '3306', 10) || 3306,
  username: process.env.DB_USERNAME || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'mydatabase',
  // IMPORTANT: keep off by default when connecting to an existing DB,
  // otherwise TypeORM may try to alter tables and fail on FK/data mismatches.
  synchronize: process.env.DB_SYNCHRONIZE === 'true',
  entities: [__dirname + '/../modules/**/entities/*.entity{.ts,.js}'],
});