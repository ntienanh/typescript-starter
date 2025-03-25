import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { FoodModule } from './food/food.module';
import { IngredientModule } from './ingredient/ingredient.module';
import { PrismaService } from './prisma/prisma.service';
import { CloudinaryModule } from './cloudinary/cloudinary.module';
import { MulterModule } from '@nestjs/platform-express';
import { FoodScheduleModule } from './food-schedule/food-schedule.module';
import { HooksModule } from './hooks/hooks.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: process.env.DB_PASSWORD || 'your_password',
      database: 'Food_planner',
      autoLoadEntities: true,
      synchronize: true,
    }),
    FoodModule,
    IngredientModule,
    HooksModule,
    MulterModule.register(), // ✅ Đăng ký Multer
    CloudinaryModule,
    FoodScheduleModule,
    HooksModule,
  ],
  providers: [PrismaService],
  exports: [PrismaService],
})
export class AppModule {}
