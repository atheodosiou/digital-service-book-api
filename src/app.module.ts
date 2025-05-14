import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { VehicleModule } from './vehicles/vehicles.module';
import { ServiceTypesModule } from './service-types/service-types.module';
import { ServiceRecordsModule } from './service-records/service-records.module';
import { DashboardModule } from './dashboard/dashboard.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => ({
        uri: config.get<string>('MONGO_URI'),
      }),
    }),
    AuthModule,
    UsersModule,
    VehicleModule,
    ServiceTypesModule,
    ServiceRecordsModule,
    DashboardModule,
  ],
})
export class AppModule {}
