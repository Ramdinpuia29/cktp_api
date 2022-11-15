import { Module } from '@nestjs/common';
import { BialService } from './bial.service';
import { BialController } from './bial.controller';
import { Services } from 'src/utils/types/services.type';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Bial } from './entities/bial.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Bial])],
  controllers: [BialController],
  providers: [
    {
      provide: Services.BIAL,
      useClass: BialService,
    },
  ],
})
export class BialModule {}
