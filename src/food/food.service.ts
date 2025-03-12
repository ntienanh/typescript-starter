import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class FoodService {
  constructor(private prisma: PrismaService) {}

  // async create(data: Prisma.FoodCreateInput) {
  //   return this.prisma.food.create({ data });
  // }

  async create(data: {
    name: string;
    image?: string;
    minCalories: number;
    maxCalories: number;
  }) {
    return this.prisma.food.create({ data });
  }

  async findAll(page: number = 1, pageSize: number = 10) {
    const skip = (page - 1) * pageSize;

    const [foods, total] = await this.prisma.$transaction([
      this.prisma.food.findMany({
        skip,
        take: pageSize,
        select: {
          id: true,
          name: true,
          description: true, // Đảm bảo có field này nếu muốn truy vấn
          image: true,
          minCalories: true,
          maxCalories: true,
          ingredients: {
            select: {
              ingredient: {
                select: { id: true, name: true },
              },
            },
          },
        },
      }),
      this.prisma.food.count(),
    ]);

    return {
      data: foods,
      meta: {
        total,
        page,
        pageSize,
        totalPages: Math.ceil(total / pageSize),
      },
    };
  }

  async addIngredient(foodId: string, ingredientId: string) {
    return this.prisma.foodIngredient.create({
      data: { foodId, ingredientId },
    });
  }
}
