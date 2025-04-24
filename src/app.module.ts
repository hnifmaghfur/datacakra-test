import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user/entities/user.entity';
import { AuthModule } from './auth/auth.module';
import { TripModule } from './trip/trip.module';
import { Trip } from './trip/entities/trip.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'src/database/sql.db',
      synchronize: true,
      entities: [User, Trip],
    }),
    UserModule,
    AuthModule,
    TripModule,
  ],
})
export class AppModule {}
