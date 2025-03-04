import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FoodService } from './food.service';
import { FoodController } from './food.controller';
import { Food } from './entities/food.entity';
import { Ingredient } from '../ingredient/entities/ingredient.entity';
import { IngredientModule } from '../ingredient/ingredient.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Food]),
    IngredientModule, // Import IngredientModule để có IngredientRepository
  ],
  controllers: [FoodController],
  providers: [FoodService],
})
export class FoodModule {}
