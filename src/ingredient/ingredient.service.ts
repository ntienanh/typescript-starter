import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class IngredientService {
  constructor(private prisma: PrismaService) {}

  async create(data: Prisma.IngredientCreateInput) {
    return this.prisma.ingredient.create({ data });
  }

  async findAll() {
    return this.prisma.ingredient.findMany({ include: { foods: true } });
  }
}
