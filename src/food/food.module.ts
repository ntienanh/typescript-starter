import { Module } from '@nestjs/common';
import { FoodService } from './food.service';
import { FoodController } from './food.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule], // Import PrismaModule vào đây
  providers: [FoodService],
  controllers: [FoodController],
})
export class FoodModule {}
