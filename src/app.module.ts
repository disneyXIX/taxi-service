import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ItemsModule } from './modules/items/items.module';
import { ClientsModule } from './modules/clients/clients.module';
import { DriversModule } from './modules/drivers/drivers.module';
import { VehiclesModule } from './modules/vehicles/vehicles.module';
import { TripsModule } from './modules/trips/trips.module';
import { ReviewsModule } from './modules/reviews/reviews.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import databaseConfig from './config/database.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [databaseConfig],
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return {
          type: 'mysql',
          host: configService.get<string>('host') ?? 'localhost',
          port: Number(configService.get<string | number>('port') ?? 3306),
          username: configService.get<string>('username') ?? 'root',
          password: configService.get<string>('password') ?? '',
          database: configService.get<string>('database') ?? 'mydatabase',
          synchronize: Boolean(configService.get<boolean>('synchronize') ?? true),
          entities: [__dirname + '/modules/**/entities/*.entity{.ts,.js}'],
        };
      },
    }),
    ItemsModule,
    ClientsModule,
    DriversModule,
    VehiclesModule,
    TripsModule,
    ReviewsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}