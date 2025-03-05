import { Controller, Get, Post, Body, Param, Query } from '@nestjs/common';
import { FoodService } from './food.service';

@Controller('food')
export class FoodController {
  constructor(private readonly foodService: FoodService) {}

  @Post()
  create(@Body() createFoodDto: { name: string }) {
    return this.foodService.create({ name: createFoodDto.name });
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
