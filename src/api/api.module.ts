import { ClassSerializerInterceptor, Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { EventsModule } from './events/events.module';
import { NewsModule } from './news/news.module';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { BialModule } from './bial/bial.module';
import { BranchModule } from './branch/branch.module';

@Module({
  imports: [UsersModule, AuthModule, EventsModule, NewsModule, BialModule, BranchModule],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: ClassSerializerInterceptor,
    },
  ],
})
export class ApiModule {}
