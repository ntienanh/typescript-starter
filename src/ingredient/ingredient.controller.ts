import { Controller, Get, Post, Body } from '@nestjs/common';
import { IngredientService } from './ingredient.service';

@Controller('ingredient')
export class IngredientController {
  constructor(private readonly ingredientService: IngredientService) {}

  @Post()
  create(@Body() createIngredientDto: { name: string }) {
    return this.ingredientService.create({ name: createIngredientDto.name });
  }

  @Get()
  findAll() {
    return this.ingredientService.findAll();
  }
}
