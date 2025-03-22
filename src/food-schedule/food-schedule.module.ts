import { Module } from '@nestjs/common';
import { FoodScheduleService } from './food-schedule.service';
import { FoodScheduleController } from './food-schedule.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  providers: [FoodScheduleService, PrismaService],
  controllers: [FoodScheduleController],
  exports: [FoodScheduleService],
})
export class FoodScheduleModule {}
