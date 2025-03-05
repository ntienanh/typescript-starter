import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class IngredientService {
  constructor(private prisma: PrismaService) {}

  async create(data: Prisma.IngredientCreateInput) {
    return this.prisma.ingredient.create({ data });
  }

  async findAll(page: number = 1, pageSize: number = 10) {
    const skip = (page - 1) * pageSize;
    const [ingredients, total] = await this.prisma.$transaction([
      this.prisma.ingredient.findMany({
        skip,
        take: pageSize,
      }),
      this.prisma.ingredient.count(),
    ]);

    return {
      data: ingredients,
      meta: {
        total,
        page,
        pageSize,
        totalPages: Math.ceil(total / pageSize),
      },
    };
  }
}
