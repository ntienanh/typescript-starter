import { Controller, Get, Post, Body, Param, Query } from '@nestjs/common';
import { FoodService } from './food.service';
import { CreateFoodDto } from './dto/food.dto';

@Controller('food')
export class FoodController {
  constructor(private readonly foodService: FoodService) {}

  @Post()
  create(@Body() createFoodDto: CreateFoodDto) {
    return this.foodService.create(createFoodDto);
  }

  @Get()
  findAll(
    @Query('page') page: number = 1,
    @Query('pageSize') pageSize: number = 10,
  ) {
    return this.foodService.findAll(Number(page), Number(pageSize));
  }

  @Post(':foodId/ingredient/:ingredientId')
  addIngredient(
    @Param('foodId') foodId: string,
    @Param('ingredientId') ingredientId: string,
  ) {
    return this.foodService.addIngredient(foodId, ingredientId);
  }
}
