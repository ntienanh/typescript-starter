import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class FoodService {
  constructor(private prisma: PrismaService) {}

  async create(data: Prisma.FoodCreateInput) {
    return this.prisma.food.create({ data });
  }

  async findAll() {
    return this.prisma.food.findMany({ include: { ingredients: true } });
  }

  async addIngredient(foodId: string, ingredientId: string) {
    return this.prisma.foodIngredient.create({
      data: { foodId, ingredientId },
    });
  }
}
