import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { FoodModule } from './food/food.module';
import { IngredientModule } from './ingredient/ingredient.module';
import { PrismaService } from './prisma/prisma.service';

@Module({
  imports: [
    ConfigModule.forRoot(), // Load biến môi trường từ .env
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
  ],
  providers: [PrismaService],
  exports: [PrismaService],
})
export class AppModule {}
