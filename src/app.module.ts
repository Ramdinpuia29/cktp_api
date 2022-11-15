import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { ApiModule } from './api/api.module';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PassportModule.register({ session: true }),
    DatabaseModule,
    ApiModule,
  ],
  controllers: [],
  providers: [AppService],
})
export class AppModule {}
