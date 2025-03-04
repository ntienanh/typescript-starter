import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Ingredient } from './entities/ingredient.entity';
import { CreateIngredientDto } from './dto/create-ingredient.dto';
import { UpdateIngredientDto } from './dto/update-ingredient.dto';

@Injectable()
export class IngredientService {
  constructor(
    @InjectRepository(Ingredient)
    private readonly ingredientRepository: Repository<Ingredient>,
  ) {}

  async create(createIngredientDto: CreateIngredientDto): Promise<Ingredient> {
    const ingredient = this.ingredientRepository.create(createIngredientDto);
    return await this.ingredientRepository.save(ingredient);
  }

  async findAll(): Promise<Ingredient[]> {
    return await this.ingredientRepository.find();
  }

  async findOne(id: number): Promise<Ingredient> {
    const ingredient = await this.ingredientRepository.findOne({
      where: { id },
    });
    if (!ingredient)
      throw new NotFoundException(`Ingredient with id ${id} not found`);
    return ingredient;
  }

  async update(
    id: number,
    updateIngredientDto: UpdateIngredientDto,
  ): Promise<Ingredient> {
    await this.ingredientRepository.update(id, updateIngredientDto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    const ingredient = await this.findOne(id);
    await this.ingredientRepository.remove(ingredient);
  }
}
