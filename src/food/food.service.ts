import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Food } from './entities/food.entity';
import { CreateFoodDto } from './dto/create-food.dto';
import { UpdateFoodDto } from './dto/update-food.dto';

@Injectable()
export class FoodService {
  constructor(
    @InjectRepository(Food)
    private readonly foodRepository: Repository<Food>,
  ) {}

  async create(createFoodDto: CreateFoodDto): Promise<Food> {
    const food = this.foodRepository.create(createFoodDto);
    return await this.foodRepository.save(food);
  }

  async findAll(): Promise<Food[]> {
    return await this.foodRepository.find();
  }

  async findOne(id: number): Promise<Food> {
    const food = await this.foodRepository.findOne({ where: { id } });
    if (!food) throw new NotFoundException(`Food with id ${id} not found`);
    return food;
  }

  async update(id: number, updateFoodDto: UpdateFoodDto): Promise<Food> {
    await this.foodRepository.update(id, updateFoodDto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    const food = await this.findOne(id);
    await this.foodRepository.remove(food);
  }
}
