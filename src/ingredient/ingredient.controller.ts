import { Controller, Get, Post, Body, Query } from '@nestjs/common';
import { IngredientService } from './ingredient.service';

@Controller('ingredient')
export class IngredientController {
  constructor(private readonly ingredientService: IngredientService) {}

  @Post()
  create(@Body() createIngredientDto: { name: string }) {
    return this.ingredientService.create({ name: createIngredientDto.name });
  }

  @Get()
  findAll(
    @Query('page') page: number = 1,
    @Query('pageSize') pageSize: number = 10,
  ) {
    return this.ingredientService.findAll(Number(page), Number(pageSize));
  }
}
